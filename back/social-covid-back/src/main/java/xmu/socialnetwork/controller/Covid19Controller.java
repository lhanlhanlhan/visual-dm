package xmu.socialnetwork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import xmu.socialnetwork.bean.Result;
import xmu.socialnetwork.mapper.CovidMapper;

import java.util.List;
import java.util.Map;

/**
 * Author itcast
 * Date 2020/5/29 11:16
 * Desc 用来接收前端数据请求的Controller
 */
@RestController//=@Controller+@ResponseBody //表示该类是SpringBoot的一个Controller,且返回的数据为Json格式
@RequestMapping("covid")
public class Covid19Controller {

    /*
     * Checked
     */

    @Autowired
    private CovidMapper covidMapper;

    /**
     * 返回某日或某范围【全国汇总数据】
     */
    @CrossOrigin
    @GetMapping("national/numbers/summary")
    public Result getNationalData(@RequestParam(value = "date", required = false) String selectDate,
                                  @RequestParam(value = "start", required = false) String startDate,
                                  @RequestParam(value = "end", required = false) String endDate) {
        System.out.println("national/all");
        List<?> dataList;
        if (selectDate != null) {
            dataList = covidMapper.getNationalData(selectDate);
            if (dataList == null || dataList.size() == 0) {
                return Result.notFound();
            }
            return Result.success(dataList.get(0));
        } else if (startDate != null && endDate != null) {
            dataList = covidMapper.getNationalDataTimeSeries(startDate, endDate);
            if (dataList == null || dataList.size() == 0) {
                return Result.notFound();
            }
            return Result.success(dataList);
        } else {
            dataList = covidMapper.getNationalDataAll();
            if (dataList == null || dataList.size() == 0) {
                return Result.notFound();
            }
            return Result.success(dataList);
        }
    }

    /**
     * 返回某日或某范围【全国各省份所有数据】
     * @return 省份名称，确诊数，疑似数，治愈数，死亡数，时间
     */
    @CrossOrigin
    @GetMapping("national/numbers")
    public Result getProvincialData(@RequestParam(value = "date", required = false)String selectDate,
                                    @RequestParam(value = "start", required = false) String startDate,
                                    @RequestParam(value = "end", required = false) String endDate) {
        List<?> dataList;
        if (selectDate != null) {
            dataList = covidMapper.getProvincialData(selectDate);
            if (dataList == null || dataList.size() == 0) {
                return Result.notFound();
            }
            return Result.success(dataList.get(0));
        } else if (startDate != null && endDate != null) {
            dataList = covidMapper.getProvincialDataTimeSeries(startDate, endDate);
            if (dataList == null || dataList.size() == 0) {
                return Result.notFound();
            }
            return Result.success(dataList);
        } else {
            dataList = covidMapper.getProvincialDataAll();
            if (dataList == null || dataList.size() == 0) {
                return Result.notFound();
            }
            return Result.success(dataList);
        }
    }

    /**
     * 获取某省份城市时间段数据【省份各城市数据】
     */
    @CrossOrigin
    @RequestMapping("provinces/{province}/numbers")
    public Result getProvinceSeriesData(@PathVariable(value = "province")String province,
                                        @RequestParam(value = "start")String start,
                                        @RequestParam(value = "end")String end){
        List<Map<String, Object>> data = covidMapper.getProvinceSeriesData(province,start,end);
        System.out.println("provinces/" + province + "/numbers, len=" + data.size());
        return Result.success(data);
    }

    /**
     * 获取pca数据列表
     */
    @CrossOrigin
    @RequestMapping("pca")
    public Result getPCAData() {
        List<Map<String, Object>> data = covidMapper.getPCAdata();
        return Result.success(data);
    }

    /*
     * Checked
     */


    /**
     * 查询动态排序的全部数据【各个省份、已 order】
     */
    @CrossOrigin
    @GetMapping("national/numbers/all-ordered")
    public Result getDynaData() {
        List<Map<String, Object>> data = covidMapper.getDynaData();
        return Result.success(data);
    }

    /**
     * 查询单省份时间段数据
     * @param province
     * @return
     */
    @CrossOrigin
    @GetMapping("area/{province}/numbers")
    public Result getTimeSeriesData(@PathVariable(value = "province") String province,
                                    @RequestParam(value = "start", required = false) String start,
                                    @RequestParam(value = "end", required = false) String end){
        List<Map<String, Object>> dataList;
        if (start == null || end == null) {
            dataList = covidMapper.getProvinceData(province);
        } else {
            dataList = covidMapper.getTimeSeriesData(province, start, end);
        }
        return Result.success(dataList);
    }

}
