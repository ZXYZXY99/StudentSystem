

<template>
    <div>
    <el-table
            :fit="true"
            :data="tableData.filter(data => !search ||
            data.classname.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
        <el-table-column
                label="班级编号"
               >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.classid }}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="班级名"
               >
            <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.classname }}</el-tag>
                    </div>

            </template>
        </el-table-column>


        <el-table-column
                label="辅导员"
                >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.counsellor }}</span>
            </template>
        </el-table-column>

        <el-table-column
                label="辅导员编号"
                >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.counsellorid }}</span>
            </template>
        </el-table-column>

        <el-table-column
                label="班级现有人数"
        >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.population }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot="header" slot-scope="scope">
                <el-button
                        size="mini"
                        type="primary"
                        @click="dialogAddClassFormVisible = true">新增班级</el-button>
                <el-input
                        style="width: 200px"
                        v-model="search"
                        size="mini"
                        placeholder="输入姓名进行搜索"/>
            </template>
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

        <!-- 弹出的新增班级表单 -->
        <el-dialog title="新增班级" :visible.sync="dialogAddClassFormVisible"  >
            <el-form :model="addGredeForm" :rules="rules" ref="addGredeForm">
                <el-form-item label="班级名称"  :label-width="formLabelWidth" prop="classname" >
                    <el-input v-model="addGredeForm.classname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="辅导员"  :label-width="formLabelWidth" prop="counsellor">
                    <el-select v-model="addGredeForm.counsellor"
                               filterable

                               @change="changeAddOption">
                        <el-option
                                v-for="item in counsellorinfo"
                                :key="item.teacherid"
                                :label="item.teachername"
                                :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddClassFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addGrede('addGredeForm')">确 定</el-button>
            </div>
        </el-dialog>


        <!-- 弹出的修改班级表单 -->
        <el-dialog title="新增班级" :visible.sync="dialogUpdateClassFormVisible"  >
            <el-form :model="updateGredeForm" :rules="rules" ref="updateGredeForm">
                <el-form-item label="班级名称"  :label-width="formLabelWidth" prop="classname" >
                    <el-input v-model="updateGredeForm.classname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="辅导员"  :label-width="formLabelWidth" prop="counsellor">
                    <el-select v-model="updateGredeForm.counsellor"
                               filterable
                               @change="changeUPdateOption">
                        <el-option
                                v-for="item in counsellorinfo"
                                :key="item.teacherid"
                                :label="item.teachername"
                                :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateClassFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateGrede('updateGredeForm')">确 定</el-button>
            </div>
        </el-dialog>



</div>
</template>

<script>
    export default {
        data() {
            return {
                search: '',
                options:[],
                rules:{

                    classname:[
                        {required: true, message: '请输入班级名称', trigger: 'blur'},
                        {min: 5, max: 12, message: '长度在 12个字符', trigger: 'blur'}
                    ],
                    counsellor:[
                        {required: true, message: '请选择辅导员', trigger: 'change'}
                    ]
                },

                dialogAddClassFormVisible:false,
                dialogUpdateClassFormVisible:false,
                formLabelWidth: '120px',
                tableData: {
                    classid:'',
                    classname:'',
                    counsellor:'',
                    counsellorid:'',
                    population:''
                },
                addGredeForm:{
                    classid:'',
                    classname:'',
                    counsellor:'',
                    counsellorid:'',
                    population:''
                },
                updateGredeForm:{
                    classid:'',
                    classname:'',
                    counsellor:'',
                    counsellorid:'',
                    population:''
                },
                counsellorinfo:
                    { id:'',
                        teacherid:'',
                        teachername:'',
                        level:'',
                        entrytime:"",
                        subject:'',
                        phone:'',
                        belong:''}
            }
        },
        methods: {
            addGrede(gredeinfo){
                const _this=this;
                this.addGredeForm.population=0
                this.$refs[gredeinfo].validate((valid)=>{
                        if (valid){
                            axios.post('http://localhost:8081/grede/addgrede',this.addGredeForm).then(function
                                (resp) {
                                    if (resp.data=="success"){
                                        _this.$message.success("添加成功!")
                                        _this.dialogAddClassFormVisible=false;
                                        _this.flushtable();
                                    } else {
                                        _this.$message.error("添加失败!")
                                        _this.dialogAddClassFormVisible=false;
                                    }

                            })
                        }
                })
            },
            //显示修改班级表单
            handleEdit(index, row) {
                console.log(index, row);
                this.dialogUpdateClassFormVisible=true;
                this.updateGredeForm.classname=row.classname
                this.updateGredeForm.counsellor=row.counsellor
                this.updateGredeForm.classid=row.classid
                this.updateGredeForm.counsellorid=row.counsellorid
            },
            //确认修改
            updateGrede(row){
                const _this=this;
                this.$refs[row].validate((valid)=>{
                    if (valid){
                        axios.post('http://localhost:8081/grede/updategrede',this.updateGredeForm).then(function
                            (resp) {
                            if (resp.data=="success"){
                                _this.$message.success("修改成功!")
                                _this.dialogUpdateClassFormVisible=false;
                                _this.flushtable();
                            } else {
                                _this.$message.error("修改失败!")
                                _this.dialogUpdateClassFormVisible=false;
                            }

                        })
                    }
                })
            },

            handleDelete(index, row) {
                console.log(index, row);
                const _this=this;

                        axios.post('http://localhost:8081/grede/deletegrede',row).then(function (resp) {
                            if (resp.data=="success"){
                                _this.$message.success("删除成功!")
                                _this.flushtable();
                            } else {
                                _this.$message.success("删除失败!")
                            }
                        })


            },
            changeAddOption(sel){
                       console.log(sel);
                        this.addGredeForm.counsellor=sel.teachername;
                        this.addGredeForm.counsellorid=sel.teacherid
            },
            changeUPdateOption(sel){
                this.updateGredeForm.counsellor=sel.teachername;
                this.updateGredeForm.counsellorid=sel.teacherid
            },
            //刷新表格
            flushtable(){
                const _this=this
                axios.get('http://localhost:8081/grede/getgredelist').then(function (resp) {
                    _this.tableData=resp.data;
                });
            },
        },created() {
            const _this=this;
            //得到表格信息
            axios.get('http://localhost:8081/grede/getgredelist').then(function (resp) {
                _this.tableData=resp.data;
            });

            //获取所有的辅导员

            axios.get('http://localhost:8081/teacher/getcounller').then(function (resp) {
                _this.counsellorinfo=resp.data
            })
        }
    }
</script>
