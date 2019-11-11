package cn.stylefeng.guns.modular.sms.controller;

import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.modular.sms.entity.TGwSpConfig;
import cn.stylefeng.guns.modular.sms.model.params.TGwSpConfigParam;
import cn.stylefeng.guns.modular.sms.service.TGwSpConfigService;
import cn.stylefeng.roses.core.base.controller.BaseController;
import cn.stylefeng.roses.core.reqres.response.ResponseData;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * 网关配置表控制器
 *
 * @author yqy
 * @Date 2019-10-31 10:42:41
 */
@Controller
@RequestMapping("/tGwSpConfig")
public class TGwSpConfigController extends BaseController {

    private String PREFIX = "/sms/tGwSpConfig";

    @Autowired
    private TGwSpConfigService tGwSpConfigService;

    /**
     * 跳转到主页面
     *
     * @author yqy
     * @Date 2019-10-31
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "/tGwSpConfig.html";
    }

    /**
     * 新增页面
     *
     * @author yqy
     * @Date 2019-10-31
     */
    @RequestMapping("/add")
    public String add() {
        return PREFIX + "/tGwSpConfig_add.html";
    }

    /**
     * 编辑页面
     *
     * @author yqy
     * @Date 2019-10-31
     */
    @RequestMapping("/edit")
    public String edit() {
        return PREFIX + "/tGwSpConfig_edit.html";
    }

    /**
     * 新增接口
     *
     * @author yqy
     * @Date 2019-10-31
     */
    @RequestMapping("/addItem")
    @ResponseBody
    public ResponseData addItem(TGwSpConfigParam tGwSpConfigParam) {
        this.tGwSpConfigService.add(tGwSpConfigParam);
        return ResponseData.success();
    }

    /**
     * 编辑接口
     *
     * @author yqy
     * @Date 2019-10-31
     */
    @RequestMapping("/editItem")
    @ResponseBody
    public ResponseData editItem(TGwSpConfigParam tGwSpConfigParam) {
        this.tGwSpConfigService.update(tGwSpConfigParam);
        return ResponseData.success();
    }

    /**
     * 删除接口
     *
     * @author yqy
     * @Date 2019-10-31
     */
    @RequestMapping("/delete")
    @ResponseBody
    public ResponseData delete(TGwSpConfigParam tGwSpConfigParam) {
        this.tGwSpConfigService.delete(tGwSpConfigParam);
        return ResponseData.success();
    }

    /**
     * 查看详情接口
     *
     * @author yqy
     * @Date 2019-10-31
     */
    @RequestMapping("/detail")
    @ResponseBody
    public ResponseData detail(TGwSpConfigParam tGwSpConfigParam) {
        TGwSpConfig detail = this.tGwSpConfigService.getById(tGwSpConfigParam.getSpnumId());
        return ResponseData.success(detail);
    }

    /**
     * 查询列表
     *
     * @author yqy
     * @Date 2019-10-31
     */
    @ResponseBody
    @RequestMapping("/list")
    public LayuiPageInfo list(@RequestParam(required = false) String condition ,TGwSpConfigParam tGwSpConfigParam) {
        if(StringUtils.isNotEmpty(condition))
            tGwSpConfigParam.setSpnum(condition);
        return this.tGwSpConfigService.findPageBySpec(tGwSpConfigParam);
    }

}


