<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_model extends CI_Model {

public function get_by_name_pwd($account, $password){//登陆
      //  $query=$this->db->query('select * from t_admin where admin_name="$admin_name" and admin_pwd="$admin_pwd"');
        $data = array(
            'email' => $account,
            'password' => $password
       );
       $this -> db -> select("name,user_id,is_admin");
       $this -> db -> from('t_user');
       $this -> db -> where($data);
       //$this -> db -> join('t_admin admin', 'blog.author=admin.admin_id');
       return $this -> db -> get() -> row();
       // return $this -> db -> get_where('t_user', $data) -> row();
}
public function get_company_id_by_user_id($user_id){
  $this -> db -> select("company_id");
       $this -> db -> from('company_user_contact');
       $this -> db -> where('user_id',$user_id);
       //$this -> db -> join('t_admin admin', 'blog.author=admin.admin_id');
       return $this -> db -> get() -> row();
}
public function reg($name,$email,$pwd){//注册
  $data = array(
            'name' =>$name,
            'email' =>$email,
            'password' => $pwd
       );
  $this->db->insert('t_user',$data);
  return $this -> db -> get_where('t_user', $data) -> row();
}
public function JoinCompany($user_id,$company_id){//建立关联
  $data = array(
            'user_id' =>$user_id,
            'company_id'=>$company_id
       );
  $this->db->insert('company_user_contact',$data);
  return $this -> db -> get_where('company_user_contact', $data) -> row();
}
public function createTeam($team_name,$invitation_code){//创建团队
  $data = array(
            'team_name' =>$team_name,
            'invitation_code' =>$invitation_code
             );
  $this->db->insert('t_team',$data);
  return $this -> db -> get_where('t_team', $data) -> row();
}
// public function searchTeam($user_id,$invitation_code){//输入邀请码，查找团队
//   $data = array(
//             'user_id' =>$user_id,
//             'invitation_code' =>$invitation_code
//              );
//   $this->db->insert('t_team',$data);
//   return $this -> db -> get_where('t_team', $data) -> row();
// }
public function findTeam($invitation_code){//输入邀请码，查找团队
  $data = array(
            'invitation_code' =>$invitation_code
             );
       $this -> db -> select("*");
       $this -> db -> from('t_team');
       $this->db->where('invitation_code',$invitation_code);
       return $this -> db -> get() -> row();
}
public function joinTeam($user_id,$team_id){//输入邀请码，查找团队
  $data = array(
            'user_id' =>$user_id,
            'team_id' =>$team_id
             );
      if($this->db->insert('team_user_contact',$data)>0){
        return TRUE;
      }else{
        return FALSE; 
      }
  }
 public function findTeamMember($team_id){
       $this -> db -> select("user_id");
       $this -> db -> from('team_user_contact');
       $this->db->where('team_id',$team_id);
       return $this -> db -> get() -> result();
 }
 public function findUserName($user_id){
       $this -> db -> select("name,user_id");
       $this -> db -> from('t_user');
       $this->db->where('user_id',$user_id);
       return $this -> db -> get() -> row();
 }
 public function findCompanyMember($company_id){
       $this -> db -> select("user_id");
       $this -> db -> from('company_user_contact');
       $this->db->where('company_id',$company_id);
       return $this -> db -> get() -> result();
 }
 public function findTeamName($team_id){
       $this -> db -> select("team_name");
       $this -> db -> from('t_team');
       $this->db->where('team_id',$team_id);
       return $this -> db -> get() -> row();
 }
 public function checkIsMember($user_id,$team_id){
  $data = array(
            'user_id' =>$user_id,
            'team_id' =>$team_id
             );
  return $this -> db -> get_where('team_user_contact', $data) ->row();
 }
 public function autoSearchTeamList($user_id){
       $this -> db -> select("team_id");
       $this -> db -> from('team_user_contact');
       $this->db->where('user_id',$user_id);
       return $this -> db -> get() -> result();
 }
 public function autoSearchMailList($user_id){
       $this -> db -> select("team_id");
       $this -> db -> from('team_user_contact');
       $this->db->where('user_id',$user_id);
       return $this -> db -> get() -> result();
 }
public function findTeamMessage($user_id){
       $this -> db -> select("t_user.name,t_user.user_job,t_user.user_tel");
       $this -> db -> from('t_user');
       $this->db->where('user_id',$user_id);
       return $this -> db -> get() -> result();
 }
 public function getTaskByTaskId($task_id){
  $this -> db -> select("*");
   $this -> db -> from('t_task');
   $this->db->where('task_id',$task_id);
   return $this -> db -> get() -> row();
 }
public function saveTask($data){
  if($this->db->insert('t_task',$data)>0){
        return TRUE;
      }else{
        return FALSE; 
      }
}
public function findTaskById($user_id){
  $data = array(
            'task_charge' => $user_id
       );
       return $this -> db -> get_where('t_task', $data) ->result();
}
public function findRemarkById($task_id){
  $data = array(
            'task_id' => $task_id
       );
       return $this -> db -> get_where('t_remark', $data) ->result();
}
public function finishTaskById($task_id){//标记完成
      $this->db->where('task_id',$task_id);
      $this->db->update('t_task',array('task_has_finished'=>"true"));
      return $this->db->get_where('t_task',array('task_id'=>$task_id))->row();
}
public function collectTaskById($task_id){//收藏
  $this->db->where('task_id',$task_id);
      $this->db->update('t_task',array('task_collect'=>"true"));
      return $this->db->get_where('t_task',array('task_id'=>$task_id))->row();
}
public function cancleFinishTaskById($task_id){//标记未完成
      $this->db->where('task_id',$task_id);
      $this->db->update('t_task',array('task_has_finished'=>"false"));
      return $this->db->get_where('t_task',array('task_id'=>$task_id))->row();
}
public function cancleCollectTaskById($task_id){//取消收藏
  $this->db->where('task_id',$task_id);
      $this->db->update('t_task',array('task_collect'=>"false"));
      return $this->db->get_where('t_task',array('task_id'=>$task_id))->row();
}
public function get_task_by_task_id($task_id){
        $data = array(
            'task_id' => $task_id
       );
       return $this -> db -> get_where('t_task', $data) ->row();
    }
public function deleteRemark($remark_id){
  if($this -> db -> delete('t_remark', array('remark_id' => $remark_id))>0){
        return TRUE;
      }else{
        return FALSE; 
      }
  
}
public function addRemark($data){
  if($this -> db -> insert('t_remark', $data)>0){
        return $this->db->get_where('t_remark',$data)->row();
      }else{
        return FALSE; 
      }
  
}
  public function getDynamic($user_id){
    return $this -> db -> get_where('t_dynamic', array('user_id'=>$user_id)) ->result();
  }

	public function get_all_favorate_by_id($employ_id){
        $data = array(
            'employ_id' => $employ_id
       );
       return $this -> db -> get_where('t_favorate', $data) ->result();
    }
	public function get_all_apply_by_id($employ_id){
        $data = array(
            'employ_id' => $employ_id
       );
       return $this -> db -> get_where('t_apply', $data) ->result();
    }

	public function delete_apply_by_id($apply_id){
        $this -> db -> delete('t_apply', array('apply_id' => $apply_id));
    }
	public function delete_employ_by_id($employ_id){
        $this -> db -> delete('t_employ', array('employ_id' => $employ_id));
    }
    public  function save($data){
		if($this->db->insert('t_employ',$data)>0){
				return TRUE;
			}else{
				return FALSE;	
			}
			
		}

    //search by keywords
    public function findUserBykeyWords($keyWords){//user

    }

    public function findTeamBykeyWords($keyWords){//team

    }

    public function findTaskBykeyWords($keyWords){//task

    }

    public function findDynamicBykeyWords($keyWords){//dynamic

    }




   public function update($employ_id,$data1){
		    $this->db->where('employ_id',$employ_id);
			$this->db->update('t_employ',$data1);
			return $this->db->get_where('t_employ',array('employ_id'=>$employ_id))->row();
}
   public function get_employ_by_page($limit,$offset){
  		// $offset=8;
		
       //return $this->db->get('t_blog', 6, $page) -> result();
       $this -> db -> select("*");
       $this -> db -> from('t_employ');
       //$this -> db -> join('t_admin admin', 'blog.author=admin.admin_id');
       $this -> db -> limit($limit, $offset);
       return $this -> db -> get() -> result();
   }
   
		public function get_news_by_id($employ_id){
			return $this->db-> get_where('t_news', array(
           'employ_id' => $employ_id
       		)) -> result();
	}
			public function get_employ_count(){
			return $this->db->count_all("t_employ");
		}


}



















