<template>
    <div class="about">
        <div align="center">
            <p id="flag" class="tishi"></p>
        </div>
        <div class="getface">
            <video id="video" width="400px" height="400px" autoplay="autoplay"></video>
            <canvas id="canvas" width="400px" height="400px" style="display: none;"></canvas>
            <img id="imgTag" src="" alt="imgTag" style="display: none;">
            <el-button  @click="tishi()">打开摄像头</el-button>
            <el-button @click="closeMedia()">关闭摄像头</el-button>
            <el-button @click="backlogin()">账号密码登陆</el-button>
        </div>
    </div>
</template>
<script>

    import {setToken} from "../util/TokenUtil";
    export  default {
        data(){
            return{
                mediaStreamTrack:null,
                canvas:null,
                video:null,
                imagestring:{
                    imagebast64:'',
                }
            }
        },methods:{
            backlogin(){
                this.$router.push("/login")
            },
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
                    let img = document.getElementById('canvas').toDataURL('image/jpeg');
                    // 这里的img就是得到的图片
                    console.log('img-----', img);
                    document.getElementById('imgTag').src = img;
                    // var params = new URLSearchParams();
                    // params.append("imagebast64",img);
                    _this.imagestring.imagebast64=img


                        // _this.axios({
                        //     method: 'post',
                        //     dataType: "json",
                        //     headers:{
                        //         'Content-type':'application/json;charset=utf-8',
                        //     },
                        //     url: 'http://localhost:8088/cloudzuul/admin/loginface',
                        //     data: params,
                        //     // params:params
                        // })
                        // this.axios.get('https://localhost:8088/codeservice/codeservice/userinfo/loginface',{params:{
                        //     "imagebast64":img
                        //     }})
                            this.axios.post('http://localhost:8088/cloudzuul/admin/loginface'
                                ,JSON.stringify(_this.imagestring),{headers:{
                                        'Content-Type': 'application/json'
                                    }})

                            .then(function (resp) {
                                if (resp.data.code==10001){
                                    _this.$message.error(resp.data.data)
                                }else if(resp.data.code==20000){
                                    _this.video.srcObject.getTracks()[0].stop()
                                    _this.$message.success("登陆成功")
                                    setToken(resp.data.data)
                                    _this.$router.push("/table")
                                }



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
            }
        },created() {
            }


    }

</script>
<style>

    .getface{
        position: absolute;
        top: 20%;
        left: 35%;

    }
    .tishi{
        font-size: 20px;

    }

</style>
