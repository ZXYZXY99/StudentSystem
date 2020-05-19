<template>
    <div>
    <el-table
            :fit="true"
            :data="tableData.filter(data => !search ||
            data.teachername.toLowerCase().includes(search.toLowerCase()))"
            height="750"
            style="width: 100%;height: 100%">
        <el-table-column
                label="编号"
                >
            <template slot-scope="scope">

                <span style="margin-left: 10px">{{scope.row.id}} </span>
            </template>
        </el-table-column>
        <el-table-column
                label="教职工工号"
                >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{scope.row.teacherid}} </span>
            </template>
        </el-table-column>

        <el-table-column
                label="姓名"
               >
            <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium"> {{scope.row.teachername}} </el-tag>
                    </div>
            </template>
        </el-table-column>

        <el-table-column
                label="级别"
                >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{scope.row.level}} </span>
            </template>
        </el-table-column>


        <el-table-column
                label="入职时间"
                >
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{scope.row.entrytime}} </span>
            </template>
        </el-table-column>

        <el-table-column
                label="主讲科目"
                >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{scope.row.subject}} </span>
            </template>
        </el-table-column>
        <el-table-column
                label="所属分院"
              >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{scope.row.belong}} </span>
            </template>
        </el-table-column>
        <el-table-column
                label="联系方式"
              >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{scope.row.phone}} </span>
            </template>
        </el-table-column>

        <el-table-column label="操作"
                         fixed="right"
                         >
            <template slot="header" slot-scope="scope">
                <el-button
                        size="mini"
                        type="primary"
                        @click="dialogFormVisible = true">新增教职工</el-button>
                <el-input
                        style="width: 200px"
                        v-model="search"
                        size="mini"
                        placeholder="输入姓名进行搜索"/>
            </template>
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 弹出的新增教职工表单 -->
    <el-dialog title="新增教职工" :visible.sync="dialogFormVisible"  >
        <el-form :model="addformData" :rules="rules" ref="addformData">
            <el-form-item label="教职工工号"  :label-width="formLabelWidth" prop="teacherid" >
                <el-input v-model="addformData.teacherid" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名"  :label-width="formLabelWidth" prop="teachername">
                <el-input v-model="addformData.teachername" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="等级"   :label-width="formLabelWidth" prop="level">
                <el-select v-model="addformData.level" style="width: 90%;" placeholder="请选择等级">
                    <el-option label="讲师" value="讲师"></el-option>
                    <el-option label="教授" value="教授"></el-option>
                    <el-option label="辅导员" value="辅导员"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入职时间"  :label-width="formLabelWidth" prop="entrytime">
                <el-date-picker
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width: 90%"
                        v-model="addformData.entrytime"
                        suffix-icon="el-icon-date"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="主讲科目"  :label-width="formLabelWidth" prop="subject" >
                <el-input v-model="addformData.subject" autocomplete="off"></el-input>
            </el-form-item>

        <el-form-item label="所属分院"  :label-width="formLabelWidth" prop="belong" >
            <el-input v-model="addformData.belong" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式"  :label-width="formLabelWidth" prop="phone" >
            <el-input v-model="addformData.phone" autocomplete="off"
                      @keyup.native="number"></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false,resetForm('addformData')">取 消</el-button>
            <el-button type="primary" @click="addTeacher('addformData')">确 定</el-button>
        </div>
    </el-dialog>


        <!-- 弹出的修改教职工表单 -->
        <el-dialog title="修改教职工" :visible.sync="dialogEditFormVisible"  >
            <el-form :model="updateformData" :rules="rules" ref="updateformData">
                <el-form-item label="教职工工号"  :label-width="formLabelWidth" prop="teacherid" >
                    <el-input v-model="updateformData.teacherid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名"  :label-width="formLabelWidth" prop="teachername">
                    <el-input v-model="updateformData.teachername" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="等级"   :label-width="formLabelWidth" prop="level">
                    <el-select v-model="updateformData.level" style="width: 90%;" placeholder="请选择等级">
                        <el-option label="讲师" value="讲师"></el-option>
                        <el-option label="教授" value="教授"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入职时间"  :label-width="formLabelWidth" prop="entrytime">
                    <el-date-picker
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            style="width: 90%"
                            v-model="updateformData.entrytime"
                            suffix-icon="el-icon-date"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="主讲科目"  :label-width="formLabelWidth" prop="subject" >
                    <el-input v-model="updateformData.subject" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="所属分院"  :label-width="formLabelWidth" prop="belong" >
                    <el-input v-model="updateformData.belong" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式"  :label-width="formLabelWidth" prop="phone" >
                    <el-input v-model="updateformData.phone" autocomplete="off"
                              @keyup.native="number"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditFormVisible = false,resetForm('updateformData')">取 消</el-button>
                <el-button type="primary" @click="updateEditTeacher('updateformData')">确 定</el-button>
            </div>
        </el-dialog>





    </div>
</template>

<script>
    import {getToken} from "../util/TokenUtil";
    export default {
        data() {
            return {
                pickerOptions: {
                    disabledDate(time) {
                        //return time.getTime() < Date.now() - 8.64e7;//设置选择今天以及今天之后的日
                        //return time.getTime() > Date.now(); //设置选择今天以及今天以前的日期
                        //return time.getTime() < Date.now();//设置选择今天之后的日期（不能选择当天时间）
                        return time.getTime() > Date.now()-8.64e7;//设置选择今天之前的日期（不能选择当天）
                    }
                },
                rules:{
                    teacherid:[
                        {required:true,message:"请输入工号",trigger:"blur"},
                        {min:12,max:12,message:"长度在12个字符",trigger:"blur"}
                        ],
                    teachername:[
                        {required:true,message:"请输入姓名",trigger:"blur"},
                        {min:2,max:7,message:"长度在2~7个字符",trigger:"blur"}
                        ],
                    level:[
                        {required: true, message: '请选等级', trigger: 'change',type:'string'}
                    ],
                    entrytime:[
                        {required:true,message: '请选择日期', trigger: 'change'}
                    ],
                    subject:[
                        {required:true,message: '请输入科目名称', trigger: 'blur'},
                        {min:2,max:7,message:"长度在2~7个字符",trigger:"blur"}
                    ],
                    belong:[
                        {required:true,message: '请输入分院名称', trigger: 'blur'},
                        {min:4,max:9,message:"长度在2~7个字符",trigger:"blur"}
                    ],phone:[
                        {required: true, message: '请输入电话', trigger: 'blur'},
                        {min: 11, max: 11, message: '长度在 11个字符', trigger: 'blur'}
                    ]

                },
                formLabelWidth: '120px',
                dialogFormVisible: false,
                dialogEditFormVisible:false,
                search:'',
                addformData:{
                    id:'',
                    teacherid:'',
                    teachername:'',
                    level:'',
                    entrytime:"",
                    subject:'',
                    phone:'',
                    belong:''
                },
                updateformData:{
                    id:'',
                    teacherid:'',
                    teachername:'',
                    level:'',
                    entrytime:"",
                    subject:'',
                    phone:'',
                    belong:''
                },
                tableData: {
                    id:'',
                    teacherid:'',
                    teachername:'',
                    level:'',
                    entrytime:"",
                    subject:'',
                    phone:'',
                    belong:''
                }
            }
        },
        methods: {
            number(){
                this.addformData.phone=this.addformData.phone.replace(/[^\.\d]/g,'');
                this.addformData.phone=this.addformData.phone.replace('.','');
            },
            handleEdit( row) {
                this.dialogEditFormVisible=true;
                this.updateformData.id=row.id;
                this.updateformData.teacherid=row.teacherid;
                this.updateformData.teachername=row.teachername;
                this.updateformData.level=row.level;
                this.updateformData.entrytime=row.entrytime;
                this.updateformData.belong=row.belong;
                this.updateformData.subject=row.subject;
                this.updateformData.phone=row.phone;

            },
            updateEditTeacher(row){
                const _this=this;
                this.$refs[row].validate((valid)=> {
                    if (valid) {
                        this.axios.post('http://localhost:8088/cloudzuul/teacher/updateteacher',{headers:{
                                token:getToken()
                            }},this.updateformData).then(function (resp) {
                            if (resp.data=="success"){
                                _this.$message.success("修改成功")
                                _this.dialogEditFormVisible=false
                                // _this.resetForm(updateformData);
                                _this.flushtable();
                            } else {
                                _this.$message.error("修改失败")
                            }
                        })
                    }
                })
             },


            handleDelete(index, row) {
                console.log( row);
                const  _this=this;
                this.axios.post('http://localhost:8088/cloudzuul/teacher/deleteteacher',{headers:{
                        token:getToken()
                    }},row).then(function
                    (resp) {
                    if (resp.data=="success"){
                        _this.$message.success("删除成功")
                        _this.flushtable();
                    } else {
                        _this.$message.error("删除成功")
                    }
                })
            },

            addTeacher(addformDatarow){
                const _this = this;
                this.$refs[addformDatarow].validate((valid)=>{
                    if (valid) {
                        this.axios.post('http://localhost:8088/cloudzuul/teacher/addteacher',{headers:{
                                token:getToken()
                            }},this.addformData).then(function (resp) {
                            if (resp.data=="success"){
                                _this.$message.success("添加成功");
                                _this.dialogFormVisible=false;
                                _this.resetForm(addformDatarow);
                                _this.flushtable();

                            } else {
                                _this.$message.error("添加失败");
                            }
                        });
                    }
                });
            },
            //清空新增表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            flushtable(){
                const _this=this;
                this.axios.get('http://localhost:8088/cloudzuul/teacher/getall',{headers:{
                        token:getToken()
                    }}).then(function (resp) {
                    _this.tableData=resp.data;
                })
            }

        },
        created() {
            const _this=this;
            this.axios.get('http://localhost:8088/cloudzuul/teacher/getall',{headers:{
                    token:getToken()
                }}).then(function (resp) {
                _this.tableData=resp.data;
            })

        }
    }
</script>
