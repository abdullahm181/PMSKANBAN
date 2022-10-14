export default class KanbanAPI {
    static async Methode(TypeMethode,requestUri, BodyData = null) {
        const Get = $.ajax({
            type: `${TypeMethode}`,
            url: `/${requestUri}`,
            data: BodyData ? BodyData : null,
        }).fail((error) => {
            console.log(error);
        });
        console.log(Get)
        return Get;
    }
}