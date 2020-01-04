/**
 * 添加或者修改页面
 */
var SendInfoDlg = {
    data: {
        content: "",
        srcId: "",
        destterminalId: "",
        entityName: "",
        msgId: "",
        result: "",
        sequenceid: "",
        linkId: "",
        msgsrc: "",
        spid: "",
        province: "",
        city: "",
        areacode: "",
        status: "",
        entityid: "",
        realmsgid: "",
        realresult: "",
        submitDate: "",
        sendDate: ""
    }
};

layui.use(['form', 'admin', 'ax','element','upload'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;
    var element = layui.element;
    //让当前iframe弹层高度适应
    admin.iframeAuto();

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/send/addItem", function (data) {
            Feng.success("添加成功！");
            window.location.href = Feng.ctxPath + '/send'
        }, function (data) {
            Feng.error("添加失败！" + data.responseJSON.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    //返回按钮
    $("#backupPage").click(function () {
        window.location.href = Feng.ctxPath + '/send'
    });

});