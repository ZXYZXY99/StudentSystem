<template>
    <div>
        <div>
            <h1>#个人中心</h1>
            <hr>
            基本资料 <br>
            用户：{{this.username}}
            <hr>

            <el-button @click="jumpGetface()"
                       :disabled="isfaceinfo"
            >完善面部信息，激活刷脸登陆</el-button>
        </div>
    </div>
</template>

<script>
    import {getToken} from "../util/TokenUtil";

    export default {
        name: "User_Center",
        data(){
            return{
                username:null,
                isfaceinfo:null
            }
        },methods:{
            jumpGetface(){
                this.$router.push("/getface")
            }


        },created() {

            const _this=this
            this.axios.get('http://localhost:8088/cloudzuul/admin/getusername',{headers:{
                    "token":getToken()
                }}).then(function (resp) {
                console.log(resp.data.data)
                _this.username=resp.data.data;
            })

            this.axios.get("http://localhost:8088/cloudzuul/admin/isfaceinfo",{headers:{
                    "token":getToken()
                }}).then(function
                (resp) {
                console.log(resp)
                _this.isfaceinfo=resp.data.data
            })

        }
    }
</script>

<style scoped>

</style>
