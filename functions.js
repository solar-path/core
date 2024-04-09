export function createModel(inputName, fields, jsonFields) {
    let { name, nameSingular, nameCapitalized } = getNamespaces(inputName);
    let formFieldsSpec = []
    if (jsonFields !== null) {
        formFieldsSpec = jsonFields;
    } else {
        formFieldsSpec = transformFieldsToObject(fields);
    }
    let modelContent = generateModelContent(inputName.toLowerCase(), formFieldsSpec);
    writeModelFile(modelContent, capitalize(nameSingular));

    // Add model to chic.json:
    if (jsonFields === null) {
        const model = {
            name: nameCapitalized,
            fields: formFieldsSpec
        };
        updateConfig({
            models: [...readConfig().models, model]
        });
    }
}