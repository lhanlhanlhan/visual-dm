<template>
  <div>
    <h1 class="page-title">
      Visual DM - 《社交网络技术与应用》课程设计
    </h1>
    <b-row>
      <b-col xs="12" lg="7">
        <Widget collapse>
          <h4>有关此项目</h4>
          <p>About This Project</p>
          <div class="widget-padding-md w-100 h-100 text-left border rounded">
            <p>Visual DM (Visual Data Mining) 是本组《社交网络技术与应用》课程设计的前端可视化页面</p>
            <p>此处放置项目简介；此处放置项目简介；此处放置项目简介；此处放置项目简介；此处放置项目简介</p>
          </div>

          <h4 class="mt-5">项目组成员简介</h4>
          <p>Introduction to Co-workers</p>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>姓名</th>
                  <th>学号</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, memId) in crewMembers" :key="memId">
                  <td>{{member.name}}</td>
                  <td>{{member.id}}</td>
                  <td><b-badge variant="primary" pill>?</b-badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Widget>
      </b-col>
      <b-col xs="12" lg="5">
        <Widget
          close collapse
        >
          <h4>版权声明</h4>
          <p>Copyright Claims</p>
          <div class="widget-padding-md w-100 h-100 text-left border rounded">
            <p>You can use the mark tag to <mark>highlight</mark> text.</p>
            <p><del>This line of text is meant to be treated as deleted text.</del></p>
            <p><ins>This line of text is meant to be treated as
              an addition to the document.</ins></p>
            <p><small>This line of text is meant to be treated as fine print.</small></p>
            <p><em>This line rendered as italicized text.</em></p>
            <p><strong>This line rendered as bold text.</strong></p>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';

export default {
  name: 'HomePage',
  components: { Widget },
  data: function() {
    return {
      crewMembers: [
        {
          'name': '李涵',
          'id': '19720182203919'
        },
        {
          'name': '陈品臻',
          'id': ''
        },
        {
          'name': '张悦',
          'id': ''
        },
        {
          'name': '李狄翰',
          'id': ''
        },
        {
          'name': '单晓妍',
          'id': ''
        }
      ]
    }
  }
};
</script>
