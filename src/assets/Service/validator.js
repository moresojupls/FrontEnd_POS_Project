class MyValidator{
    constructor(_items){
        this.items = _items;
    }

    ArrayEmpty(items){
        try{
            return items.length <= 0
        }catch(err){
            return err
        }
    }

    ValueUndefined(items){
        return items === undefined
    }
}

export  default MyValidator