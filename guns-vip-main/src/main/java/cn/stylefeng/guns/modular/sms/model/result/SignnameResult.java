package cn.stylefeng.guns.modular.sms.model.result;

import lombok.Data;
import java.util.Date;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * <p>
 * 签名配置表
 * </p>
 *
 * @author yqy
 * @since 2019-10-31
 */
@Data
public class SignnameResult implements Serializable {

    private static final long serialVersionUID = 1L;


    /**
     * 主键ID
     */
    private Long signid;

    /**
     * 黑名单号码
     */
    private String signname;

    /**
     * 企业ID
     */
    private Integer entid;

    /**
     * 黑名单类型
     */
    private Integer signtype;

    /**
     * 备注
     */
    private String remark;

    /**
     * 状态0,可用，1不可用
     */
    private Integer status;

    /**
     * 添加时间
     */
    private Date adddate;

}
