package xmu.socialnetwork.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * Author itcast
 * Date 2020/5/29 11:36
 * Desc
 */
@Mapper
@Component
public interface CovidMapper {

    /*
     * Checked
     */

    /**
     * 查询全国疫情汇总数据【某日】
     * @param datetime
     * @return
     */
    @Select("select * from covid_summary where datetime = #{datetime}")
    List<Map<String,Object>> getNationalData(String datetime);

    /**
     * 查询全国疫情汇总数据【范围】
     */
    @Select("select * from covid_summary t " +
            "WHERE t.`datetime` >= #{start} " +
            "AND t.`datetime` <= #{end} order by `datetime`")
    List<Map<String,Object>> getNationalDataTimeSeries(String start, String end);

    /**
     * 查询全国疫情汇总数据【全部】
     */
    @Select("select * from covid_summary order by `datetime`")
    List<Map<String,Object>> getNationalDataAll();

    /**
     * 查询全国各个省份的数据【某日】
     * @param datetime
     * @return 省份名称，确诊数，疑似数，治愈数，死亡数，时间
     */
    @Select("select * from covid_short where datetime = #{datetime}")
    List<Map<String, Object>> getProvincialData(String datetime);

    /**
     * 查询全国各个省份某日的数据【范围】
     * @return 省份名称，确诊数，疑似数，治愈数，死亡数，时间
     */
    @Select("select * from covid_short t " +
            "WHERE t.`datetime` >= #{start} " +
            "AND t.`datetime` <= #{end} " +
            "order by `datetime`")
    List<Map<String, Object>> getProvincialDataTimeSeries(String start, String end);

    /**
     * 查询全国各个省份某日的数据【全部】
     * @return 省份名称，确诊数，疑似数，治愈数，死亡数，时间
     */
    @Select("select * from covid_short order by `datetime`")
    List<Map<String, Object>> getProvincialDataAll();

    /**
     *
     */
    @Select("SELECT province_shortname, city_name, MAX(confirmed_count) AS confirmed_count,\n" +
            "MAX(suspect_count) AS suspect_count, MAX(cured_count) AS cured_count,\n" +
            "MAX(dead_count) AS dead_count, `time` FROM covid_city WHERE province_shortname=#{province}\n" +
            "AND `time`>=#{start} AND `time`<=#{end}\n" +
            "GROUP BY  province_shortname, city_name, `time`\n" +
            "ORDER BY `time`;")
    List<Map<String, Object>> getProvinceSeriesData(String province, String start, String end);

    /*
     * Checked
     */

    /**
     * 查询某省份 一段时间 的数据
     * @return
     */
    @Select("SELECT * FROM covid_gather t WHERE t.`province_shortname` like concat('%',#{province},'%') AND t.`datetime` >= #{start} AND t.`datetime` <= #{end} order by `datetime`")
    List<Map<String, Object>> getTimeSeriesData(String province, String start, String end);

    /**
     * 查询动态排序的数据
     * @return
     */
    @Select("select * from covid_gather order by `datetime`,`confirmed_count` desc")
    List<Map<String,Object>> getDynaData();

    /**
     * 某个省的数据按照日期排序输出
     * @param province
     * @return
     */
    @Select("select * from covid_gather where province_shortname like concat('%',#{province},'%') order by `datetime`")
    List<Map<String, Object>> getProvinceData(String province);

    /**
     * PCA数据
     * @return 省份名称，pca0，pca1，level
     */
    @Select("select * from pca")
    List<Map<String, Object>> getPCAdata();
}
