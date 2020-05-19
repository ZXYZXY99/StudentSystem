<template>
<!--    <div class="login">-->
<!--        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"-->
<!--                 v-loading="loading"-->
<!--                 element-loading-text="拼命加载中"-->
<!--                 element-loading-spinner="el-icon-loading"-->
<!--                 element-loading-background="rgba(0, 0, 0, 0.8)"-->
<!--        >-->
<!--            <el-form-item label="用户名" prop="adminname">-->
<!--                <el-input v-model="ruleForm.adminname"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
<!--                <el-form-item label="密码" prop="adminpassword">-->
<!--                    <el-input type="password" v-model="ruleForm.adminpassword"></el-input>-->
<!--                </el-form-item>-->


<!--                <el-form-item>-->
<!--                    <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>-->
<!--                    <el-button @click="resetForm('ruleForm')">重置</el-button>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--        </el-form>-->
<!--    </div>-->


    <el-row :gutter="10" align="middle">
        <el-col :xs="{span:24,offset:0}" :sm="{span:16,offset:4}" :md="{span:8,offset:8}">

            <div class="login">
                <el-card>
                    <h1>StudentSystem</h1>
                    <h2>LOGIN</h2>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="adminname" >
                            <el-input placeholder="请输入你的手机号" v-model="ruleForm.adminname"></el-input>
                        </el-form-item>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="密码" prop="adminpassword">
                                <el-input type="password" placeholder="请输入密码" v-model="ruleForm.adminpassword"></el-input>
                            </el-form-item>


                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')"
                                           v-loading.fullscreen.lock="fullscreenLoading">登陆</el-button>
<!--                                <el-button type="primary" @click="findpass()">找回密码</el-button>-->
                                <el-button >重置</el-button>
                                <el-button  @click="loginjumpface()">刷脸登陆</el-button>
                            </el-form-item>
                        </el-form>
                    </el-form>
                </el-card>
                <!--            <h1 style="color: crimson">维护中</h1>-->
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import {setToken} from "../util/TokenUtil";
    export default {

        data() {
            return {
                fullscreenLoading:false,
                // loading:false,
                ruleForm: {
                    adminname: '',
                    adminpassword:''
                },
                rules: {
                    adminname: [
                        { required: true, message: '请输入电话号码'},
                        {validator:function(rule,value,callback){
                                if(/^1[34578]\d{9}$/.test(value) == false){
                                    callback(new Error("请输入正确的手机号"));
                                }else{
                                    callback();
                                }
                            }, trigger: 'blur'}
                    ],
                    adminpassword: [
                        { required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 5, max: 14, message: '长度在5 到 14 个字符', trigger: 'blur'
                        }
                    ],




                }
            };
        },
        methods: {
            submitForm(ruleForm) {
                this.fullscreenLoading = true;

                    const _this=this;
                    this.$refs[ruleForm].validate((valid) => {
                        if (valid) {
                        this.axios.post('http://localhost:8088/cloudzuul/admin/login',this.ruleForm).then(function
                            (resp) {
                            console.log(resp)
                                if (resp.data.code=10000){

                                    setToken(resp.data.data)
                                    _this.fullscreenLoading = false;
                                            _this.$router.push("/aside")
                                } else {
                                    _this.$message.error("账号或密码错误")
                                    _this.fullscreenLoading = false;
                                }
                        })
                    } else {
                        _this.$message.error("登陆失败")
                            _this.fullscreenLoading = false;
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            loginjumpface(){
                this.$router.push("/loginface")
            }
        }
    }
</script>
