package xmu.socialnetwork.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;


@Mapper
@Component
public interface SocialMapper {

    /**
     * 返回时间-情感值
     * @return date，sentiments
     */
    @Select("select datetime, sentiment from weibo_sentiment order by `datetime`" )
    List<Map<String, Float>> getSentiment();

    /**
     * 返回时间-情感值
     * @return date，sentiments
     */
    @Select("select datetime, num from weibo_num order by `datetime`" )
    List<Map<String, Integer>> getWeiboNum();

    /**
     * 返回发微博分布时间
     * @return date，sentiments
     */
    @Select("select day_time, frequency from `weibo_time`" )
    List<Map<String, Integer>> getWeiboTime();

}
