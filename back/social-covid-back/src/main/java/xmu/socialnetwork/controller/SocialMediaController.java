package xmu.socialnetwork.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xmu.socialnetwork.bean.Result;
import xmu.socialnetwork.mapper.SocialMapper;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("social")
public class SocialMediaController {

    @Autowired
    private SocialMapper socialMapper;

    /**
     * 查询时间-情感数据
     */
    @CrossOrigin
    @GetMapping("sentiments")
    public Result getSentimentsData() {
        List<Map<String, Float>> data = socialMapper.getSentiment();
        return Result.success(data);
    }

    /**
     * 查询时间-发博数数据
     */
    @CrossOrigin
    @GetMapping("num")
    public Result getQuantityData() {
        List<Map<String, Integer>> data = socialMapper.getWeiboNum();
        return Result.success(data);
    }

    /**
     * 查询微博日分布频率
     */
    @CrossOrigin
    @GetMapping("time-freq")
    public Result getTimeFreq() {
        List<Map<String, Integer>> data = socialMapper.getWeiboTime();
        return Result.success(data);
    }

}
