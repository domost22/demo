export const DbConfig = {
    name: 'croatia-airport-transfer',
    version: 1,
    objectStoresMeta: [
        {
            store: 'locations',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'name', keypath: 'name', options: { unique: false } },
                { name: 'email', keypath: 'email', options: { unique: false } }
            ]
        }
    ]
};
