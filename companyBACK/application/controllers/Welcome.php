<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */

	public function index()
	{
		$this->load->view('welcome_message');
	}

	public function Reg(){//注册
		$name=$this->input->get('name');
    	$email=$this->input->get('email');
		$pwd=$this->input->get('pwd');
		 $this -> load -> model('user_model');
   		 $row = $this -> user_model -> reg($name,$email,$pwd);
		 // $company=$this -> user_model -> JoinCompany($row->user_id);
			if($row){
			$data=array(
				'arr'=>$row
			);
			$this->load->view("api/json",$data);
        }else{
        	$error=array(
        			"message"=>"系统繁忙，请稍后重试"
        		);
        	$data=array(
			'arr'=>$error
			);
        	$this->load->view("api/jsonerror",$data);
        }
    }
    public function JoinCompany(){//待完成
    	$name=$this->input->get('name');
    	$email=$this->input->get('account');
		$pwd=$this->input->get('password');
		$company_id=$this->input->get('company_id');
		 $this -> load -> model('user_model');
   		 $row = $this -> user_model -> reg($name,$email,$pwd);
			if($row){
			$company=$this -> user_model -> JoinCompany($row->user_id,$company_id);
			// die;
			$data=array(
				'arr'=>$row
			);
			$this->load->view("api/json",$data);
        }else{
        	$error=array(
        			"message"=>"系统繁忙，请稍后重试"
        		);
        	$data=array(
			'arr'=>$error
			);
        	$this->load->view("api/jsonerror",$data);
        }
    }
    public function CreateCompany(){//待完成
    	$name=$this->input->get('name');
    	$email=$this->input->get('email');
		$pwd=$this->input->get('pwd');
		 $this -> load -> model('user_model');
   		 $row = $this -> user_model -> reg($name,$email,$pwd);
		 // $company=$this -> user_model -> JoinCompany($row->user_id);
			if($row){
			$data=array(
				'arr'=>$row
			);
			$this->load->view("api/json",$data);
        }else{
        	$error=array(
        			"message"=>"系统繁忙，请稍后重试"
        		);
        	$data=array(
			'arr'=>$error
			);
        	$this->load->view("api/jsonerror",$data);
        }
    }
	public function checkLogin(){//登陆
		$email=$this->input->get('email');
		$pwd=$this->input->get('pwd');
		 $this -> load -> model('user_model');
   		 $row = $this -> user_model -> get_by_name_pwd($email,$pwd);
			if($row){
				$company_id = $this -> user_model -> get_company_id_by_user_id($row->user_id);
				$result=array(
						'user_info'=>$row,
						'company_info'=>$company_id
					);
			$data=array(
				'arr'=>$result
			);
			$this->load->view("api/json",$data);
        }else{
        	$error=array(
        			"message"=>"未找到匹配结果"
        		);
        	$data=array(
			'arr'=>$error
			);
        	$this->load->view("api/jsonerror",$data);
        }
		
	}

	public function CreateTeam(){//创建团队
		$team_name=$this->input->get('teamName');
    	$invitation_code=$this->input->get('InvitationCode');
		 $this -> load -> model('user_model');
   		 $row = $this -> user_model -> createTeam($team_name,$invitation_code);
			if($row){
			$data=array(
				'arr'=>$row
			);
			$this->load->view("api/json",$data);
        }else{
        	$error=array(
        			"message"=>"系统繁忙，请稍后重试"
        		);
        	$data=array(
			'arr'=>$error
			);
        	$this->load->view("api/jsonerror",$data);
        }
    }
    public function AutoSearchCompanyMember(){//查找公司成员
    	$company_id=$this->input->post('company_id');
		 $this -> load -> model('user_model');
   		 $result = $this -> user_model -> findCompanyMember($company_id);
			if($result){
			$a=array();
		 	for($i=0;$i<count($result);$i++){
		 		$userName=$this -> user_model -> findUserName($result[$i]->user_id);
				array_push($a,$userName);
		 		}	
			$data=array(
				'arr'=>$a
			);
			$this->load->view("api/json",$data);
        }else{
        		$error=array(
        			"message"=>"系统繁忙，请稍后重试"
        		);
        	$data=array(
			'arr'=>$error
			);
        	$this->load->view("api/jsonerror",$data);
        	}
    }
    public function getTaskById(){
    	$task_id=$this->input->post('task_id');
		 $this -> load -> model('user_model');
   		 $result = $this -> user_model -> getTaskByTaskId($task_id);
			if($result){
   		 	$remark=$this -> user_model -> findRemarkById($result->task_id);
   		 	$a=array();
   		 	for($i=0;$i<count($remark);$i++){
   		 		$who=$this -> user_model -> findUserName($remark[$i]->user_id);
   		 		$remarkMen=array(
   		 			'byWho'=>$who,
   		 			'remarkWhat'=>$remark[$i]
   		 			);
   		 		array_push($a, $remarkMen);
   		 	}
   		 	$task=array(
	   		 	'task_info'=>$result,
	   		 	'remark_info'=>$a
	   		 	);
			$data=array(
				'arr'=>$task
			);
			$this->load->view("api/json",$data);
        }else{
        		$error=array(
        			"message"=>"系统繁忙，请稍后重试"
        		);
        	$data=array(
			'arr'=>$error
			);
        	$this->load->view("api/jsonerror",$data);
        	}
    }
    public function SearchTeam(){//搜索团队
		$user_id=$this->input->get('user_id');
    	$invitation_code=$this->input->get('InvitationCode');
		 $this -> load -> model('user_model');
   		 $row = $this -> user_model -> findTeam($invitation_code);
			if($row){//row是team_id
			$data=array(
				'arr'=>$row
			);
			$this->load->view("api/json",$data);
        }else{
        		$error=array(
        			"message"=>"系统繁忙，请稍后重试"
        		);
        	$data=array(
			'arr'=>$error
			);
        	$this->load->view("api/jsonerror",$data);
        	}
    }
    public function SearchTaskList(){//搜索任务列表
		$user_id=$this->input->post('user_id');
		 $this -> load -> model('user_model');
   		 $result = $this -> user_model -> findTaskById($user_id);
   	// 	 $a=array();
   	// 	 for($i=0;$i<count($result);$i++){
   	// 	 	$remark=$this -> user_model -> findRemarkById($result[$i]->task_id);
   	// 	 	$dataList=array(
	   // 		 	'task_info'=>$result[$i],
	   // 		 	'remark_info'=>$remark
	   // 		 	);
				// array_push($a,$dataList);
   	// 	 }
			if($result){
			$data=array(
				'arr'=>$result
			);
			$this->load->view("api/json",$data);
        }else{
        		$error=array(
        			"message"=>"系统繁忙，请稍后重试"
        		);
        	$data=array(
			'arr'=>$error
			);
        	$this->load->view("api/jsonerror",$data);
        	}
    }
    public function createTask(){//新建任务 标记
    	$task_name=$this->input->get("taskName");
    	$task_detail=$this->input->get("taskDetail");
    	$urgencyLevel=$this->input->get("urgencyLevel");
    	$taskRemarks=$this->input->get("taskRemarks");
    	$task_charge=$this->input->get("user");
    	$data=array(
				'task_name'=>$task_name,
				'task_detail'=>$task_detail,
				'task_charge'=>$task_charge,
				'task_remarks'=>$taskRemarks,
				'urgency_level'=>$urgencyLevel,
				'task_collect'=>"false",
				'task_has_finished'=>"false"
			);
    	$charge=$this->input->get("user");
    	$this -> load -> model('user_model');
   		 $row = $this -> user_model -> saveTask($data);
			if($row){
			$data=array(
				'arr'=>$row
			);
			$this->load->view("api/json",$data);
        }else{
        		$error=array(
        			"message"=>"系统繁忙，请稍后重试"
        		);
        	$data=array(
			'arr'=>$error
			);
        	$this->load->view("api/jsonerror",$data);
        	}
    }
    public function markCollect(){
    	$task_id=$this->input->post("task_id");
    	$how=$this->input->post("how");
    	$this -> load -> model('user_model');
    	$task=$this -> user_model -> get_task_by_task_id($task_id);
    	if($how=="collect"){
    		if($task->task_collect=="true"){//已收藏
    			$result = $this -> user_model -> cancleCollectTaskById($task_id);
    		}else{
    			$result = $this -> user_model -> collectTaskById($task_id);
    		}
    	}else if($how=="finish"){
    		if($task->task_has_finished=="true"){//已完成
    			$result = $this -> user_model -> cancleFinishTaskById($task_id);
    		}else{
    			$result = $this -> user_model -> finishTaskById($task_id);
    		}
    	}
			if($result){
			$data=array(
				'arr'=>$result
			);
			$this->load->view("api/json",$data);
        }else{
        		$error=array(
        			"message"=>"系统繁忙，请稍后重试"
        		);
        	$data=array(
			'arr'=>$error
			);
        	$this->load->view("api/jsonerror",$data);
        	}
    }
    public function JoinTeam(){//搜索团队
		$user_id=$this->input->get('user_id');
    	$team_id=$this->input->get('team_id');
		 $this -> load -> model('user_model');
		 $hasJoin=$this -> user_model -> checkIsMember($user_id,$team_id);//是否已经是该成员
		 if($hasJoin){
		 	$error=array(
        			"message"=>"您已经是该团队成员了"
        		);
        	$data=array(
			'arr'=>$error
			);
        	$this->load->view("api/jsonerror",$data);
		 }else{
			 	$row = $this -> user_model -> joinTeam($user_id,$team_id);
				if($row){//true
				 $result = $this -> user_model -> findTeamMember($team_id);
					$data=array(
					'arr'=>$result
				);
				$this->load->view("api/json",$data);
	        	}else{
	        		$error=array(
	        			"message"=>"系统繁忙，请稍后重试"
	        		);
	        	$data=array(
				'arr'=>$error
				);
	        	$this->load->view("api/jsonerror",$data);
	        	}
			 }	 
    }

    public function AutoSearchTeamList(){
    	 $user_id=$this->input->get('user_id');
		 $this -> load -> model('user_model');
		 $teamId=$this -> user_model -> autoSearchTeamList($user_id);//是否已经是该成员
		 if($teamId){
		 	$a=array();
		 	for($i=0;$i<count($teamId);$i++){
		 		$teamName=$this -> user_model -> findTeamName($teamId[$i]->team_id);
		 		$result = $this -> user_model -> findTeamMember($teamId[$i]->team_id);
		 		for($j=0;$j<count($result);$j++){
		 			$userData=$this -> user_model -> findTeamMessage($result[$j]->user_id);
		 		$dataList=array(
					'teamName'=>$teamName,
					'user_info' =>$userData
				);
				array_push($a,$dataList);
		 		}	
		 	}
		 	$data=array(
					'arr'=>$a
				);
        	$this->load->view("api/json",$data);
		 }else{
			$error=array(
	        			"message"=>"系统繁忙，请稍后重试"
	        		);
	        	$data=array(
				'arr'=>$error
				);
	        	$this->load->view("api/jsonerror",$data);
    		}
		}

	public function AutoSearchMailList(){
		$user_id=$this->input->get('user_id');
		 $this -> load -> model('user_model');
		 $teamId=$this -> user_model -> autoSearchMailList($user_id);
		 if($teamId){
		 	$a=array();
		 	for($i=0;$i<count($teamId);$i++){
		 		$teamName=$this -> user_model -> findTeamName($teamId[$i]->team_id);
		 		$result = $this -> user_model -> findTeamMember($teamId[$i]->team_id);
		 		for($j=0;$j<count($result);$j++){
		 			$userData=$this -> user_model -> findTeamMessage($result[$j]->user_id);
		 		$dataList=array(
					'teamName'=>$teamName,
					'user_info' =>$userData
				);
				array_push($a,$dataList);
		 		}	
		 	}
		 	$data=array(
					'arr'=>$a
				);
        	$this->load->view("api/json",$data);
		 }else{
			$error=array(
	        			"message"=>"系统繁忙，请稍后重试"
	        		);
	        	$data=array(
				'arr'=>$error
				);
	        	$this->load->view("api/jsonerror",$data);
    		}
		}

		public function DeleteRemark(){//删除评论
			$remark_id=$this->input->post('remark_id');
			 $this -> load -> model('user_model');
	   		 $row = $this -> user_model -> deleteRemark($remark_id);
				if($row){
				$data=array(
					'arr'=>$row
				);
				$this->load->view("api/json",$data);
	        }else{
	        	$error=array(
	        			"message"=>"系统繁忙，请稍后重试"
	        		);
	        	$data=array(
				'arr'=>$error
				);
	        	$this->load->view("api/jsonerror",$data);
        	}
		}

		public function AddRemark(){//添加评论
			$task_id=$this->input->post('task_id');
			$user_id=$this->input->post('user_id');
			$remark_detail=$this->input->post('remark_detail');
			$data=array(
				'remark_detail'=>$remark_detail,
				'task_id'=>$task_id,
				'user_id'=>$user_id
				);
			 $this -> load -> model('user_model');
	   		 $row = $this -> user_model -> addRemark($data);
				if($row){
				$data=array(
					'arr'=>$row
				);
				$this->load->view("api/json",$data);
	        }else{
	        	$error=array(
	        			"message"=>"系统繁忙，请稍后重试"
	        		);
	        	$data=array(
				'arr'=>$error
				);
	        	$this->load->view("api/jsonerror",$data);
        	}
		}

		public function GetDynamic(){
			$user_id=$this->input->post('user_id');
			 $this -> load -> model('user_model');
	   		 $result = $this -> user_model -> getDynamic($user_id);
				if($result){
				$data=array(
					'arr'=>$result
				);
				$this->load->view("api/json",$data);
	        }else{
	        	$error=array(
	        			"message"=>"系统繁忙，请稍后重试"
	        		);
	        	$data=array(
				'arr'=>$error
				);
	        	$this->load->view("api/jsonerror",$data);
        	}
		}
		public function SearchByKeyWords(){
			$keyWords=$this->input->post('keyWords');
			$where=$this->input->post('where');
			$this -> load -> model('user_model');
			switch ($where)
			{
			case "user":
			  $result = $this -> user_model -> findUserBykeyWords($keyWords);
			  break;  
			case "team":
			  $result = $this -> user_model -> findTeamBykeyWords($keyWords);
			  break;
		  	case "task":
		  	  $result = $this -> user_model -> findTaskBykeyWords($keyWords);
		  	  break;  
			case "dynamicState":
			  $result = $this -> user_model -> findDynamicBykeyWords($keyWords);
			  default:
			  
			}
			if($result){
				$data=array(
					'arr'=>$result
				);
				$this->load->view("api/json",$data);
	        }else{
	        	$error=array(
	        			"message"=>"系统繁忙，请稍后重试"
	        		);
	        	$data=array(
				'arr'=>$error
				);
	        	$this->load->view("api/jsonerror",$data);
        	}
		}






}
