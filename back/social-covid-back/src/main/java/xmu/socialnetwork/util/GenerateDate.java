package xmu.socialnetwork.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

/**
 * @Author Pinzhen Chen
 * @Date 2021/5/9 3:04
 */
public class GenerateDate {

    private static Random random;

    /**
     * 生成一个在开始日期和结束日期之间的随机日期
     * @param beginDate 开始日期
     * @param endDate 结束日期
     * @return 返回一个在beginDate与endDate之间的随机日期
     */
    public static Date randomDate(String beginDate, String endDate){
        try {
            //建立一个SimpleDateFormat对象，指定好时间格式
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd"); //把传进来的String类型的时间转化为Date类型
            Date start = format.parse(beginDate);
            Date end = format.parse(endDate); //如果开始时间大于等于结束时间，啥也不干了，返回null
            if(start.getTime() >= end.getTime()){
               return null;
            } //调用random函数，生成代表特定日期的long类型的随机数
            //getTime函数得到的是long类型的数
            long date = random(start.getTime(),end.getTime()); //根据这个随机数，实例化一个日期对象，也就是生成了一个随机日期
            return new Date(date);
        } catch (Exception e) {
            e.printStackTrace();
        } return null;
    }

    private static long random(Long start, Long end) {
        random = new Random();
        return start+Math.abs(random.nextLong())%(end-start);
    }

}
