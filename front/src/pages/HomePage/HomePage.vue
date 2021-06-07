<template>
  <div>
    <h1 class="page-title">Visual DM - 《社交网络技术与应用》课程设计</h1>
    <b-row>
      <b-col xs="12" lg="7">
        <Widget collapse>
          <h4>有关此项目</h4>
          <p>About This Project</p>
          <div class="">
            <p class="fw-normal">
              更新时间：2021 年 6 月 7 日
            </p>
            <p class="fw-normal">
              Visual DM (Visual Data Mining)
              是本组《社交网络技术与应用》课程设计的前端可视化系统，
              是本组为在课程设计中产生的数据分析所制作的所有可视页面的门户网站。
            </p>
            <b-badge variant="warning" class="text-white"> 免责声明 </b-badge>
            <p class="fw-normal mt-2">
              本系统展现的任何数据及其任何分析文本乃对数据的客观反应和/或评价，
              不代表本组的任何立场。
            </p>
          </div>

          <h4 class="mt-5">项目组成员简介 (姓氏笔画序)</h4>
          <p>Introduction to Co-workers (Ordered by strokes)</p>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>姓名</th>
                  <th>学号</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, memId) in crewMembers" :key="memId">
                  <td>{{ member.name }}</td>
                  <td>{{ member.id }}</td>
                  <!-- <td><b-badge variant="primary" pill>?</b-badge></td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </Widget>
      </b-col>
      <b-col xs="12" lg="5">
        <Widget collapse>
          <h4>版权声明</h4>
          <div class="fw-normal">
            <p>Copyright 2021 H. Li et el.</p>
            <p>
              Permission is hereby granted, free of charge, to any person
              obtaining a copy of this software and associated documentation
              files (the "Software"), to deal in the Software without
              restriction, including without limitation the rights to use, copy,
              modify, merge, publish, distribute, sublicense, and/or sell copies
              of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:
            </p>
            <p>
              The above copyright notice and this permission notice shall be
              included in all copies or substantial portions of the Software.
            </p>
            <p>
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
              HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
              WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
              DEALINGS IN THE SOFTWARE.
            </p>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";

export default {
  name: "HomePage",
  components: { Widget },
  data: function () {
    return {
      crewMembers: [
        {
          name: "李涵",
          id: "19720182203919",
        },
        {
          name: "李狄翰",
          id: "24320182203221",
        },
        {
          name: "陈品臻",
          id: "24320182203173",
        },
        {
          name: "张悦",
          id: "10120182203143",
        },
        {
          name: "单晓妍",
          id: "24320182203184",
        },
      ],
    };
  },
};
</script>
