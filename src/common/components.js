/**
 * 通用组件汇总, 各个模块必须通过此类引用具体组件:
 *    import {Component, ...} from 'common/components';
 * 这样做可以很方便的对公用组件进行批量引用和统一管理, 以及低耦合可替换.
 *
 * 实现新组件必须继承Component类, 然后将组件注册在这里, 并添加简要的用途注释。
 */

// 组件基类
export {default as Component} from 'components/Component';

// 表单相关控件
export {default as FormGroup} from 'components/FormGroup';
export {default as Form, FormItem} from 'components/Form';
export {default as Input} from 'components/form/Input';
export {default as Button} from 'components/form/Button';
export {default as Radio} from 'components/form/Radio';
export {default as Selector} from 'components/form/Selector';
export {default as Number} from 'components/form/Number';
export {default as DatePicker} from 'components/form/DatePicker';
export {default as Upload} from 'components/form/Upload';
export {default as Checkbox} from 'components/form/Checkbox';
export {default as InputStep} from 'components/form/InputStep';
export {default as EditableText} from 'components/form/EditableText';

// 依赖于api接口的组件封装
export {default as RemoteComponent} from 'components/RemoteComponent';
export {default as RemoteCheckbox} from 'components/RemoteCheckbox';
export {default as RemoteSelector} from 'components/RemoteSelector';
export {default as RemoteTable} from 'components/RemoteTable';

export {default as Scene} from 'components/Scene.js';
export {default as SearchInput} from 'components/SearchInput';
// export {default as Upload} from 'components/Upload';

export {default as Breadcrumb} from 'components/Breadcrumb';
export {default as PageNotFound} from 'components/PageNotFound';
export {default as DatePickerGroup} from 'components/DatePickerGroup';
export {default as RemoteSearchInput} from 'components/RemoteSearchInput';

