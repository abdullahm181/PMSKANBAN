export default class KanbanAPI {
    static Methode(TypeMethode, requestUri, BodyData = null, callback) {
        var data;
        const Get = $.ajax({
            type: `${TypeMethode}`,
            url: `/${requestUri}`,
            data: BodyData ? BodyData : null,
            success: function (resp) {
                data = resp;
                callback(data);
            }
        }).fail((error) => {
            console.log(error);
        });
        console.log(Get)
        return data;
    }
}