<template>
        <div>

            <el-button type="primary" @click="addsemester">新增学年</el-button>
            <el-table
                    :fit="true"
                    :data="tableData.filter(data => !search ||
                    data.calssess.toLowerCase().includes(search.toLowerCase())||
                    data.semester.toLowerCase().includes(search.toLowerCase())
                    )"
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
                        <span style="margin-left: 10px">{{ scope.row.studentid }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        label="姓名"
                       >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.studentname }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="班级"
                      >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.calssess }}</span>
                    </template>
                    <template slot-scope="scope" slot="header" >
                        <el-select v-model="search" placeholder="请选择班级">
                            <el-option  v-for="item in grede"
                                        :key="item.classid"
                                        :label="item.classname"
                                        :value="item.classname"></el-option>

                        </el-select>
                    </template>


                </el-table-column>

                <el-table-column
                        label="学生联系方式"
                       >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.studentphone }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        label="学年"
                        >
                    <template slot-scope="scope" slot="header" >
                        <el-select v-model="search" placeholder="请选择学年">
                            <el-option  v-for="item in semester"
                                        :key="item.semester"
                                        :label="item.semester"
                                        :value="item.semester"></el-option>

                        </el-select>
                    </template>
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.semester }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        label="学费"
                       >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.tuition }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        label="学费缴费状态"
                      >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.tuitionstatus }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        label="住宿费"
                        >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.quarterage }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="住宿费缴费状态"
                      >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.quarteragestatus }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="clihandleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>




            <!-- 弹出的新增学年表单 -->
            <el-dialog title="新增学年" :visible.sync="dialogAddFormVisible"  >
                <el-form :model="addsemesterData" :rules="rules" ref="addsemesterData">
                    <el-form-item label="选择学年"  :label-width="formLabelWidth">
                        <el-input v-model="addsemesterData.semester" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="学费"  :label-width="formLabelWidth">
                        <el-input v-model="addsemesterData.tuition" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="住宿费"  :label-width="formLabelWidth">
                        <el-input v-model="addsemesterData.quarterage" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogAddFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addsemesterqr('addsemesterData')">确 定</el-button>
                </div>
            </el-dialog>




            <!-- 弹出的修改缴费表单 -->
            <el-dialog title="新增学年" :visible.sync="dialogEditFormVisible"  >
                <el-form :model="addsemesterData" :rules="rules" ref="addsemesterData">
                    <el-form-item label="学费"  :label-width="formLabelWidth">
                        <el-select v-model="addsemesterData.tuitionstatus">
                            <el-option label="已缴" value="已缴"></el-option>
                            <el-option label="未缴" value="未缴"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="住宿费"  :label-width="formLabelWidth">
                        <el-select v-model="addsemesterData.quarteragestatus">
                            <el-option label="已缴" value="已缴"></el-option>
                            <el-option label="未缴" value="未缴"></el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogEditFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="Editsemesterqr('addsemesterData')">确 定</el-button>
                </div>
            </el-dialog>



        </div>
</template>


<script>
    import {getToken} from "../util/TokenUtil";
    export default {
        data(){
           return{

               search: '',
               rules:{

               },
               formLabelWidth: '120px',
               // tableHeight: window.innerHeight *0.95,
               addsemesterArry:[],
               dialogAddFormVisible:false,
               dialogEditFormVisible:false,
               addsemesterData:{
                   id:'',
                   studentid:'',
                   studentname:'',
                   calssess:'',
                   semester:'',//学年
                   studentphone:'',
                   tuition:"",//学费
                   tuitionstatus:'',//学费缴费状态
                   quarterage:'',//住宿费
                   quarteragestatus:'',//住宿费缴费状态
                   loading:true,
               },
               tableData:{
                   id:'',
                   studentid:'',
                   studentname:'',
                   calssess:'',
                   semester:'',//学年
                   studentphone:'',
                   tuition:"",//学费
                   tuitionstatus:'',//学费缴费状态
                   quarterage:'',//住宿费
                   quarteragestatus:''//住宿费缴费状态
               },
               grede:{
                   classid:'',
                   classname:'',
                   counsellor:'',
                   counsellorid:''

               },
               semester:{
                   semester:''
               }

           }
        },
        methods:{

            addsemester(){
                this.dialogAddFormVisible=true;
            },
            addsemesterqr(tab){
                const _this=this;
                let _tuition=_this.addsemesterData.tuition
                let _quarterage=_this.addsemesterData.quarterage
                let _semester=_this.addsemesterData.semester;
                console.log(_tuition+_quarterage+_semester);
                console.log('我是'+_this.addsemesterArry);
                this.$refs[tab].validate((valid)=>{
                    if (valid){
                        this.axios.post('http://localhost:8088/cloudzuul/finance/insertsemester',{headers:{
                                token:getToken()
                            }},_this.addsemesterData).then(function
                            (resp) {
                            console.log(resp)
                            _this.dialogAddFormVisible=false;
                            _this.flushtable();
                        })
                    }

                })
            },
            flushtable(){
                const _this=this;
                this.axios.get('http://localhost:8088/cloudzuul/finance/getall',{headers:{
                        token:getToken()
                    }}).then(function (resp) {
                    _this.tableData=resp.data;
                });
            },
            //点击修改按钮
            clihandleEdit(index,row){
                this.dialogEditFormVisible=true;

                this.addsemesterData=row;

            },
            //确认修改
            Editsemesterqr(tab){
                const _this=this;
                this.$refs[tab].validate((valid)=>{
                    if (valid){
                        this.axios.post('http://localhost:8088/cloudzuul/finance/updatestatus',{headers:{
                                token:getToken()
                            }},this.addsemesterData).then(function
                            (resp) {
                            if (resp.data=="success"){
                                _this.dialogEditFormVisible=false;
                                _this.flushtable();
                                _this.$message.success("修改成功")
                            } else {
                                _this.$message.success("修改失败")

                            }
                        });
                    }

                })
            }

        },created() {
            //获取表格数据
            const _this=this;
            this.axios.get('http://localhost:8088/cloudzuul/finance/getall',{headers:{
                    token:getToken()
                }}).then(function (resp) {
                _this.loading=false
                _this.tableData=resp.data;
            });

           this.axios.get('http://localhost:8088/cloudzuul/grede/getgredelist',{headers:{
                    token:getToken()
                }}).then(function (resp) {

                _this.grede=resp.data;
            });

            this.axios.get('http://localhost:8088/cloudzuul/finance/getallsemester',{headers:{
                    token:getToken()
                }}).then(function (resp) {
                _this.semester=resp.data;
            });

        }

    }
</script>

<style scoped>

</style>
