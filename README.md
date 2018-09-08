# 小型财务系统
![image](http://img0.ph.126.net/l5N0E4lN-pxB5PIYkhRMnw==/1664080062413925693.png)
## 实现功能
1. 记录支出和收入
2. 删除记录
3. 修改记录
4. 整合结果

## 目录结构
- components
    - AmountBox.js (上方整合记录结果框)
    ![image](http://img0.ph.126.net/4h7jnQGSNfoZvX0vTVSQmw==/6608204520913094883.png)
    - Record.js (单独记录)
    ![image](http://img1.ph.126.net/wT59QopTh3bU84IKgh1DPA==/6597833927240289808.png)
    - Records.js (全部组件整合)
    - RecordsForm.js (添加记录表单)
    ![image](http://img2.ph.126.net/29ugqlGrkWGaqaPtn-h1Vg==/2114158550174205101.png)

## 项目亮点
### 1.组件操作的传值
例如：在更新和删除某一条记录时，是在单个记录的组件中选择，但是若想要时事更新，则需要改变整个大组件的Records
```
//Record.js(单条记录中)
<button className="btn btn-info mr-1" onClick={this.handleUpdate.bind(this)}>Update</button>

//handleUpdate方法
handleUpdate(e){
    e.preventDefault(); //取消按钮的默认事件（例如，表单有时提交自动跳转）
    const record = {
        date:this.refs.date.value,
        title:this.refs.date.title,
        amount:this.refs.amount.value
    }
    axios.get("..."+this.props.id,record)
    .then(Response=>{
        this.props.handleUpdateRecords(Response.data,this.props);  //这个方法是大的组件中赋予
        alert("修改成功");  
        this.setState({
            edit:false;    //修改表单隐藏，数据出现
        })
    })
    
}
```
```
//Records.js(所有组件的集合中)
    <tbody>  //显示所有记录
        {records.map((record)=>
            <Record key={record.id}
            {...record}  //这里是所有属性即props
            handleUpdateRecord = {this.updateRecord.bind(this)}
            handleDeleteRecord = {this.deleteRecord.bind(this)}
        }}
    </tbody>
    
updateRecord(record,preRecord){
    //这里对应单个组件中handleUpdateRecords(Response.date,this.props);中的参数
    //更新参数
    const records = this.state.records; //这里对应数据库中所有的数据记录
    const newRecords = records.map(item=>{
        if(item.id!=preRecord.id){  //如果不是更新的那条数据
            return item;
        }else{
            return{
                ...item,
                ...record  //这里后面的会覆盖前面的
            }
        }
    })
}
```
### 2.ref的应用
ref表示为对组件真正实例的引用，其实就是ReactDOM.render()返回的组件实例

在更新记录时，用到了ref。
```
<td>
    <input type="text" className="form-control" defaultValue={this.props.date} ref="date" />
</td>
<td>
    <select className="form-control" ref="title" defaultValue={this.props.title}>
        <option>收入</option>
        <option>支出</option>
    </select>
</td>
<td>
    <input type="text" className="form-control" defaultValue={this.props.amount} ref="amount" />
</td>
     
//获取输入的信息时，就只需要
 const record = {
        date:this.refs.date.value,
        title:this.refs.date.title,
        amount:this.refs.amount.value
    }
```
### 3.增加记录时，另一种动态获取输入框内容的方法
```
//RecordsForm.js中
class RecordsForm extends Component{
    constructor(props){
        super(props);
        this.state={
            date:"",
            title:"",
            amount:""
        }
    }
}
    <input type="date" className="form-control" onChange={this.handleChange.bind(this)} id="date" placeholder="Date" value={this.state.date} /> //先动态赋值。
    
//输入内容触动handleChange方法
handleChange(event){
    let name,obj;
    name = event.target.id;
    this.setState((
        obj = {},
        obj[name] = event.target.value,
        obj
    ))  //这里就动态更新了state中的数据
}
```
## 说明
- npm install
- npm start
