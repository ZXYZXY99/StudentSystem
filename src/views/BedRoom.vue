<template>
    <div>
        <el-table
                :fit="true"
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="编号"
            >
                <template slot-scope="scope">

                    <span style="margin-left: 10px">{{scope.row.id}} </span>
                </template>
            </el-table-column>
            <el-table-column
                    label="寝室号"
            >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.bedroomnuber}} </span>
                </template>
            </el-table-column>

            <el-table-column
                    label="所属班级"
            >
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium"> {{scope.row.belongclass}} </el-tag>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                    label="入住人数"
            >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.population}} </span>
                </template>
            </el-table-column>


            <el-table-column label="操作">
                <template slot="header" slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="dialogAddClassFormVisible = true">新增寝室</el-button>
                    <el-input
                            style="width: 200px"
                            v-model="search"
                            size="mini"
                            placeholder="输入寝室号进行搜索"/>
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






    </div>


</template>

<script>
    import {getToken} from "../util/TokenUtil";
    export default {
        data(){
            return{
                tableData:{
                    id:'',
                    bedroomnuber:'',
                    belongclass:'',
                    population:''

                }




            }

        },
        name: "BedRoom",
        created() {
            const _this=this;
            this.axios.get('http://localhost:8088/cloudzuul/bedroom/getlist',{headers:{
                    token:getToken()
                }}).then(function (resp) {
                _this.tableData=resp.data
            })



        }
    }
</script>

<style scoped>

</style>
