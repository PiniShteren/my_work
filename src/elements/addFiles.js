import * as DocumentPicker from "expo-document-picker";

export const addFiles = (arrTypes, multiple, set) => {
    return new Promise((resolve, reject) => {
        DocumentPicker.getDocumentAsync({
            type: arrTypes,
            multiple: multiple
        }).then((res) => {
            set(res)
            resolve(true);
        }).catch((err) => reject(err));
    })
}