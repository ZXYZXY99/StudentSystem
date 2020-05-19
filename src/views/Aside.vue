<template>
            <div id="aside" >

                <el-container style=" border: 1px solid #eee ;position: absolute;.el-aside { height:100%;}"   >
                    <el-header style="text-align: right; font-size: 25px;background-color: cyan">
                            <div class="header">
                                <el-dropdown>
                                    <el-button>
                                        <img alt="" class="avatar" src="../images/portrait.png" />
                                        {{this.username}}
                                        <i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                        <el-dropdown-menu slot="dropdown" >
                                            <el-dropdown-item @click.native="usercenter()">个人中心
                                            </el-dropdown-item>
                                            <el-dropdown-item @click.native="loginout()">退出</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                         </div>
                    </el-header>



                    <el-container style=".el-aside {height:100vh;} background-color: #2c3e50">

                        <el-aside width="10%" style="background-color: #2c3e50" >
                            <el-menu :default-openeds="['1']" router
                                     class="el-menu-vertical-demo"
                                     background-color="#545c64" text-color="#fff" active-text-color="#409EFF"
                                    >
                                <el-submenu index="1" >
                                    <template slot="title"><i class="el-icon-message"></i>学生管理系统</template>
                                    <el-menu-item @click="bedroom('/table')">学生基本信息</el-menu-item>
                                    <el-menu-item @click="bedroom('/teacher')">教师基本信息</el-menu-item>
                                    <el-menu-item @click="bedroom('/fanance')" >财务管理系统</el-menu-item>
                                    <el-menu-item @click="bedroom('/classSystem')" >班级信息管理</el-menu-item>
                                    <el-menu-item @click="bedroom('/bedroom')">寝室管理</el-menu-item>
                                    <el-menu-item @click="bedroom('/systemconfig')">个人中心</el-menu-item>
                                    <template slot="title"></template>
                                </el-submenu>

                            </el-menu>
                        </el-aside>


                        <el-main style="width: 100%;height: 100%">
                            <router-view></router-view>
                        </el-main>
                    </el-container>
                </el-container>


            </div>



</template>



<style scoped lang="scss" >

    html,
    body,.homebox,#app,.el-container{height:100%;padding:0;margin:0;width:100%;}
    .header{
        height: 100%;
        width: 100%;
    .el-dropdown {
        float: right;
        margin-right: 50px;
    .el-button {
        padding: 2px 2px 2px 2px;  // 重置button的样式，去除本有的padding
        border-radius: 50px;
        color: #00B5FF;
        font-size: 14px;
    .avatar {
        width: 50px;
        height: 50px;
        margin-right: 6px;
        border-radius: 40px;
        vertical-align: middle
    }
    }
    }
    }
</style>

<script>
    import {removeToken} from "../util/TokenUtil";
    import {getToken} from "../util/TokenUtil";

    export default {
        data() {
            const item = {
                date: '2016-05-02',
                name: '王小虎asdas',
                address: '上海市普陀区金沙江路 1518 弄'
            };
            return {
                tableData: Array(20).fill(item),
                username:'',
            }
        },methods:{
            loginout(){
                console.log("退出")
                    var _this=this;
                console.log(getToken())
                    this.axios.post('http://localhost:8088/cloudzuul/admin/out',null,{headers:{
                            "token":getToken()
                        }}).then(function () {
                        removeToken();
                        _this.$router.push({ name: 'login' })
                    })


            },
            bedroom(rou){
                console.log(rou)
                const loading = this.$loading({
                    lock: true,
                    text: '拼命加载中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    loading.close();
                }, 500);
                this.$router.push(rou)
            },
            usercenter(){
                this.$router.push("/systemconfig")
            }
        },created() {
            const _this=this
            this.axios.get('http://localhost:8088/cloudzuul/admin/getusername',{headers:{
                    "token":getToken()
                }}).then(function (resp) {
                console.log(resp.data.data)
                _this.username=resp.data.data;
            })
        }
    };
</script>
