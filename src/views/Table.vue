<template>

    <div >


    <el-table
            :fit="true"
            :height="tableHeight"
            :data=" (tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())||
        data.classess.toLowerCase().includes(search.toLowerCase())))"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            style="width: 100%">
        <el-table-column
                label="序号"

                >


            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
        </el-table-column>

        <el-table-column
                label="学号"
               >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.studyid }}</span>
            </template>
        </el-table-column>

        <el-table-column
                label="班级"
                >
            <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                <span style="margin-left: 10px">{{ scope.row.classess }}</span>
                </div>
            </template>


            <template slot-scope="scope" slot="header" >
                <el-select v-model="search" placeholder="请选择班级">
                    <el-option  v-for="item in gredelist"
                                :key="item.classid"
                                :label="item.classname"
                                :value="item.classname"></el-option>

                </el-select>
            </template>
        </el-table-column>

        <el-table-column
                label="姓名"
               >
<!--            姓名列-->
            <template slot-scope="scope">
                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </template>
        </el-table-column>

        <el-table-column
                label="性别"
               >
            <!--            姓名列-->
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.sex }}</span>
<!--                <el-tag size="medium">{{ scope.row.sex }}</el-tag>-->
            </template>
        </el-table-column>

        <el-table-column
                label="民族"
                >
            <!--            姓名列-->
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.nation }}</span>
            </template>
        </el-table-column>

        <el-table-column
                label="学生联系电话"
                >
            <!--            姓名列-->
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.selfphone }}</span>

            </template>
        </el-table-column>

        <el-table-column
                label="学生家长联系电话"
                >

            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.familyphone }}</span>
            </template>
        </el-table-column>

        <el-table-column
                label="寝室号"
               >

            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.bedchambernumber }}</span>
            </template>
        </el-table-column>


        <el-table-column
                label="入学时间"
                >

            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.enroltime}}</span>
            </template>
        </el-table-column>

        <el-table-column
                fixed="right"
                label="操作"
                >
            <template slot="header" slot-scope="scope">
                <el-button
                        size="mini"
                        type="primary"
                        @click="dialogFormVisible = true">新增学生</el-button>
                <el-input
                        style="width: 200px"
                        v-model="search"
                        size="mini"
                        placeholder="输入姓名进行搜索"/>
            </template>
            <template slot-scope="scope">
                <el-popconfirm
                        title="这是一段内容确定删除吗？"
                        @onConfirm="handleDelete(scope.row)"
                >
                    <el-button slot="reference"
                               size="mini"
                               type="danger"
                               >删除</el-button>
                </el-popconfirm>

                <el-button
                        size="mini"
                        @click="openeditForm(scope.row)">编辑</el-button>



            </template>
        </el-table-column>
    </el-table>


        <!-- 弹出的新增学生表单 -->
        <el-dialog title="新增学生" :visible.sync="dialogFormVisible"  >
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="学号" :label-width="formLabelWidth" prop="studyid" >
                    <el-input v-model="form.studyid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="班级" :label-width="formLabelWidth" prop="classess" >
                    <el-select v-model="form.classess" placeholder="请选择班级" style="width: 100%">
                        <el-option v-for="item in gredelist"
                                   :key="item.classid"
                                   :label="item.classname"
                                   :value="item.classname"></el-option>

                    </el-select>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" prop="sex" >
                    <el-select v-model="form.sex" placeholder="请选择性别" style="width: 100%">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="民族" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.nation" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学生联系电话" :label-width="formLabelWidth" prop="selfphone">
                    <el-input v-model="form.selfphone" autocomplete="off"
                              @keyup.native="number"></el-input>
                </el-form-item>
                <el-form-item label="家庭联系电话" :label-width="formLabelWidth" prop="familyphone">
                    <el-input v-model="form.familyphone" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="寝室号" :label-width="formLabelWidth" prop="name">
                    <el-select v-model="form.bedchambernumber" placeholder="请选择寝室" filterable style="width: 100%" >
                        <el-option
                                v-for="item in bedchambernumber"
                                :key="item.bedroomnuber"
                                    :label="item.bedroomnuber"
                                   :value="item.bedroomnuber">
                            </el-option>

                    </el-select>
                </el-form-item>

                <el-form-item label="入学时间" :label-width="formLabelWidth" prop="enroltime"  >
                    <el-date-picker
                        v-model="form.enroltime"
                        type="datetime"
                        placeholder="选择日期时间"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                ></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false,resetForm('form')">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>


<!--        弹出的修改学生信息表单-->
        <el-dialog title="修改学生信息" :visible.sync="dialogeditFormVisible"  >
            <el-form :model="editform" :rules="rules" ref="editform">
                <el-form-item label="学号" :label-width="formLabelWidth" prop="studyid" >
                    <el-input v-model="editform.studyid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="editform.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="班级" :label-width="formLabelWidth" prop="classess" >
                    <el-select v-model="editform.classess" placeholder="请选择班级" style="width: 100%">
                        <el-option label="18软件1" value="18软件1"></el-option>
                        <el-option label="18软件2" value="18软件2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" prop="sex" >
                    <el-select v-model="editform.sex" placeholder="请选择性别" style="width: 100%">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="民族" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="editform.nation" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学生联系电话" :label-width="formLabelWidth" prop="selfphone">
                    <el-input v-model="editform.selfphone" autocomplete="off"
                              @keyup.native="number"></el-input>
                </el-form-item>
                <el-form-item label="家庭联系电话" :label-width="formLabelWidth" prop="familyphone">
                    <el-input v-model="editform.familyphone" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="寝室号" :label-width="formLabelWidth" prop="name">
                    <el-select v-model="editform.bedchambernumber" placeholder="请选择寝室" filterable style="width: 100%" >
                        <el-option
                                v-for="item in bedchambernumber"
                                :key="item.bedroomnuber"
                                :label="item.bedroomnuber"
                                :value="item.bedroomnuber">
                        </el-option>

                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogeditFormVisible = false,resetForm('editform')">取 消</el-button>
                <el-button type="primary" @click="submitEditForm('editform')" >确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<style>

</style>

<script>
    import {getToken} from "../util/TokenUtil";

    export default {



        data() {
            return {
                tableHeight: window.innerHeight *0.95,
                pickerOptions: {
                    disabledDate(time) {
                        //return time.getTime() < Date.now() - 8.64e7;//设置选择今天以及今天之后的日
                        //return time.getTime() > Date.now(); //设置选择今天以及今天以前的日期
                        //return time.getTime() < Date.now();//设置选择今天之后的日期（不能选择当天时间）
                        return time.getTime() > Date.now()-8.64e7;//设置选择今天之前的日期（不能选择当天）
                    }
                },
                loading:true,
                pagesize: 5,
                currentPage:1,
                search: '',
                dialogTableVisible: false,
                dialogFormVisible: false,
                dialogeditFormVisible: false,
                gredelist:{
                    classid:'',
                    classname:'',
                    counsellor:'',
                    counsellorid:'',
                    population:''
                },
                form: {
                    id:'',
                    studyid: '',
                    name: '',
                    classess: '',
                    nation:'',
                    selfphone:'',
                    familyphone:'',
                    sex:'',
                    bedchambernumber:'',
                    enroltime:''
                },
                editform: {
                    id:'',
                    studyid: '',
                    name: '',
                    classess: '',
                    nation:'',
                    selfphone:'',
                    familyphone:'',
                    sex:'',
                    bedchambernumber:'',
                    enroltime:''
                },
                formLabelWidth: '120px',

                rules: {
                    studyid: [
                        {required: true, message: '请输入学号', trigger: 'blur'},
                        {min: 12, max: 12, message: '长度在 12个字符', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '字段不能为空', trigger: 'blur'},
                        {min: 2, max: 7, message: '长度在2 到 7 个字符', trigger: 'blur'}
                    ],
                    classess: [
                        {required: true, message: '请选择班级', trigger: 'change',type:'string'}],
                    sex:[{
                        required: true, message: '请选择性别', trigger: 'change',type:'string'
                    }],
                    selfphone:[
                        {required: true, message: '请输入电话', trigger: 'blur'},
                        {min: 11, max: 11, message: '长度在 11个字符', trigger: 'blur'}],
                    familyphone:[
                        {required: true, message: '请输入电话', trigger: 'blur'},
                        {min: 11, max: 11, message: '长度在 11个字符', trigger: 'blur'}],
                    enroltime:[
                        {required:true,message: '请选择日期', trigger: 'change'}
                   ]

                },
                tableData: [{
                    id:'',
                    studyid: '',
                    name: '',
                    classess: '',
                    nation:'',
                    selfphone:'',
                    familyphone:'',
                    sex:'',
                    bedchambernumber:'',
                    enroltime:''


                } ],
                bedchambernumber:{
                    bedroomnuber:''
                }

            }
        },

        methods: {
            number(){
                this.form.selfphone=this.form.selfphone.replace(/[^\.\d]/g,'');
                this.form.selfphone=this.form.selfphone.replace('.','');
            },
            submitForm(ruleForm){
                const _this=this;
                this.$refs[ruleForm].validate((valid)=>{
                    if (valid){
                        axios.post('http://localhost:8088/cloudzuul/student/addstudent',this.form,{headers:{
                                token:getToken()
                            }}).then(function
                            (resp) {

                                _this.$message.success("添加成功")
                                //刷新表格
                                _this.getStudent();
                                _this.resetForm(ruleForm);
                            _this.dialogFormVisible = false

                        })
                    }else {
                        _this.$message.error("添加失败")
                    }
                })
            }

            ,
            //从数据库中拿到所有学生数据
            getStudent(){
                const  _this=this;
                this.axios.get('http://localhost:8088/cloudzuul/student/queryAll',{headers:{
                        token:getToken()
                    }}).then(function (resp) {
                    console.log(resp)
                    _this.tableData=resp.data
                })
            },

            handleDelete(row) {
                const _this = this;
                            this.axios.post('http://localhost:8088/cloudzuul/student/deleteone',row,{headers:{
                                    "token":getToken()
                                }}).then(function () {
                                _this.$message.success("删除成功")
                                //刷新表格
                                _this.getStudent();
                            })



            },
            //打开修改学生数据表单
            openeditForm(row){
                this.dialogeditFormVisible=true;
                this.editform.name=row.name;
                this.editform.studyid=row.studyid;
                this.editform.classess=row.classess;
                this.editform.id=row.id;
                this.editform.sex=row.sex;
                this.editform.selfphone=row.selfphone;
                this.editform.familyphone=row.familyphone;
                this.editform.nation=row.nation;
                this.editform.bedchambernumber=row.bedchambernumber;

            },

            //清空新增表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //确认修改按钮
            submitEditForm(row){
                const _this = this;
                this.$refs[row].validate((valid)=>{
                    if (valid){
                        this.axios.post('http://localhost:8088/cloudzuul/student/updatestudent', this.editform,{headers:{
                                token:getToken()
                            }}).then(function () {
                            _this.$message.success("修改成功")
                            //刷新表格
                            _this.getStudent();
                            _this.resetForm("editform")
                            _this.dialogeditFormVisible=false
                        })
                    }else {
                        _this.$message.error("修改失败")
                    }
                });
            }



        },
            created(){
            const  _this=this;
            this.axios.get('http://localhost:8088/cloudzuul/student/queryAll',{headers:{
                    token:getToken()
                }}).then(function (resp) {
                console.log(resp)
                _this.tableData=resp.data

            });
            this.axios.get("http://localhost:8088/cloudzuul/grede/getgredelist",{headers:{
                    token:getToken()
                }}).then(function (resp) {
                _this.gredelist=resp.data
            });

                this.axios.get("http://localhost:8088/cloudzuul/bedroom/getlist",{headers:{
                    token:getToken()
                    }}).then(function (resp) {
                        _this.loading=false
                    _this.bedchambernumber=resp.data
                })

        }




    }
</script>
