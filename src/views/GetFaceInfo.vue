<template>
    <div>
        <div class="getface">
            <video id="video" width="400px" height="400px" autoplay="autoplay"></video>
            <canvas id="canvas" width="400px" height="400px" style="display: none;"></canvas>
            <img id="imgTag" src="" alt="imgTag" style="display: none;">
            <el-button  @click="tishi()">打开摄像头</el-button>
            <el-button @click="closeMedia()">关闭摄像头</el-button>
            <el-button @click="back()">返回个人中心</el-button>
        </div>

    </div>
</template>

<script>
    import {getToken} from "../util/TokenUtil";
    export default {
        name: "GetFaceInfo",
        data(){
            return{
                mediaStreamTrack:null,
                canvas:null,
                video:null,
                username:''
            }
        },methods:{
            facelogin(){
                // 摄像头
                const  _this=this
                setTimeout(function () {
                    _this.$message.error("请正视摄像头")
                })
                this.canvas = document.getElementById('canvas')
                this.video = document.getElementById('video')

                let constraints = {
                    video: {width: 500, height: 500},
                    audio: false
                };
                let promise = navigator.mediaDevices.getUserMedia(constraints);
                promise.then((mediaStream) => {
                    this.mediaStreamTrack = typeof mediaStream.stop === 'function' ? mediaStream :
                        mediaStream.getTracks()[1];
                    this.video.srcObject = mediaStream;
                    this.video.play();
                });

                setTimeout(function () {
                    let video = document.getElementById('video');
                    let canvas = document.getElementById('canvas');
                    let ctx = canvas.getContext('2d');
                    ctx.drawImage(video, 0, 0, 500, 500);
                    // toDataURL  ---  可传入'image/png'---默认, 'image/jpeg'
                    let img = document.getElementById('canvas').toDataURL();
                    // 这里的img就是得到的图片
                    console.log('img-----', img);
                    document.getElementById('imgTag').src = img;

                    console.log(_this.username+"我是用户名")
                    var params = new URLSearchParams();
                    params.append("imagebast64",img);
                    params.append("user_name",_this.username)
                    _this.axios({
                        method: 'post',
                        dataType: "json",
                        headers:{
                            'Content-type': 'application/x-www-form-urlencoded',
                            'token':getToken()
                        },
                        url: 'http://localhost:8088/cloudzuul/admin/getface',
                        data:params
                    }).then(function (resp) {
                        console.log(resp)

                    });
                },3000);

            },
            tishi(){
                const  _this=this
                _this.$message.success("正在打开摄像头")
                setTimeout(function () {
                    _this.facelogin();
                },500)
            },
            closeMedia(){
                const  _this=this
                _this.video.srcObject.getTracks()[0].stop()
            },
            back(){
                this.$router.push("/systemconfig")
            }
        },created() {
            const _this=this



            this.axios.get('http://localhost:8088/cloudzuul/admin/getusername',{headers:{
                    "token":getToken()
                }}).then(function (resp) {
                // console.log(resp.data.data)
                _this.username=resp.data.data;
                console.log(_this.username+"我是用户名")
            });



        }


    }
</script>

<style scoped>
    .getface{
        position: absolute;
        top: 20%;
        left: 35%;

    }
</style>
