import * as admin from 'firebase-admin';

interface ReadQuery {
    path: string,
    field: string,
    equalTo: any,
    limit?: number
}
export class RealTimeDb {

    db: admin.database.Database;

    private static _instance: RealTimeDb;

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    private constructor() {
        this.db = admin.database();
    }

    /**
     * getRef
     */
    public getRef(path: string): admin.database.Reference {
        return this.db.ref(path);
    }

    setData = async (path: string, data: any): Promise<any> => {
        const db = this.db.ref(path);
        return new Promise((res, rej) => {
            db.set({ ...data }).then((value) => {
                res(value);
            }).catch(error => {
                rej(error);
            });
        })
    }

    readData = async (args: ReadQuery): Promise<any> => {

        const { path, field, equalTo, limit } = args;
        const db = this.db.ref(path);

        return new Promise((res, rej) => {
            db.orderByChild(field).equalTo(equalTo).limitToFirst(limit || 1).once("value")
                .then(snapshot => {
                    const snapValue = snapshot.val();
                    res(snapValue)

                }).catch(e => {
                    console.log('orderByChild snap', e)
                    rej(null)
                });
        })

    }



}

export default RealTimeDb;