class QueryGeneratorClass {


    selectQueryGenerator(url) {
        const tableNameMatch = url.match(/\/table\/([^\/]*)\/read/);
        const tableName = tableNameMatch ? tableNameMatch[1] : null;
        if (!tableName) {
            throw new Error('Table name not found in the URL.');
        }
        let sqlQuery = `SELECT `;
        let selectFields = '*';
        let whereClause = '';
        let orderByClause = '';
        let limitClause = '';
        let offsetClause = '';
        let searchClause = '';
        const params = new URLSearchParams(url.split('?')[1]);
        if (params.has('$select')) {
            selectFields = params.get('$select').replace(/,/g, ', ');
        }
        sqlQuery += `${selectFields} FROM ${tableName}`;
        if (params.has('$filter')) {
            const filterConditions = params.get('$filter')
                .replace(/ eq /g, ' = ')
                .replace(/ and /g, ' AND ')
                .replace(/ or /g, ' OR ')
                .replace(/ ne /g, ' != ')
                .replace(/ lt /g, ' < ')
                .replace(/ le /g, ' <= ')
                .replace(/ gt /g, ' > ')
                .replace(/ ge /g, ' >= ')
                .replace(/datetime'/g, '\'')
                .replace(/'/g, '\'');
            whereClause = ` WHERE ${filterConditions}`;
        }
        if (params.has('$orderby')) {
            const orderByFields = params.get('$orderby').replace(/,/g, ', ');
            orderByClause = ` ORDER BY ${orderByFields}`;
        }
        if (params.has('$top')) {
            limitClause = ` LIMIT ${params.get('$top')}`;
        }
        if (params.has('$skip')) {
            offsetClause = ` OFFSET ${params.get('$skip')}`;
        }
        if (params.has('$search')) {
            const searchKeyword = params.get('$search').replace(/"/g, '\'');
            searchClause = ` WHERE MATCH(${selectFields}) AGAINST (${searchKeyword} IN NATURAL LANGUAGE MODE)`;
            whereClause = searchClause;
        }
        sqlQuery += whereClause + orderByClause + limitClause + offsetClause + ';';
        return sqlQuery;
    }

    updateQueryGenerator(url, payload) {
        const urlParts = url.split('/');
        const tableName = urlParts[urlParts.length - 2];
        const keyValueString = urlParts[urlParts.length - 1].match(/\(([^)]+)\)/)[1];
        const [key, value] = keyValueString.split(',');
        const updates = Object.entries(payload).map(([column, newValue]) => `${column}='${newValue}'`).join(', ');
        const query = `UPDATE ${tableName} SET ${updates} WHERE ${key}='${value}';`;
        return query;
    }

    insertQueryGenerator(url, payload) {
        const urlParts = url.split('/');
        const tableName = urlParts[urlParts.length - 2];
        const keys = Object.keys(payload);
        const values = Object.values(payload).map(value => `'${value}'`);
        const query = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${values.join(', ')});`;
        return query;
    }


    deleteQueryGenerator(url) {
        const urlParts = url.split('/');
        const tableName = urlParts[urlParts.length - 2]; 
        const keyValueString = urlParts[urlParts.length - 1].match(/\(([^)]+)\)/)[1];
        const [key, value] = keyValueString.split(',');
        const query = `DELETE FROM ${tableName} WHERE ${key}='${value}';`;
        return query;
    }

    procedureGenerator(url){
        const urlParts = url.split('/');
        const procedure = urlParts[urlParts.length - 1]; 
        const procedure_statement = `CALL ${procedure};`
        return procedure_statement;
    }

    distinctQueryGenerator(url){
        const urlParts = url.split('/');
        const distinctName = urlParts[urlParts.length - 1];
        const tableName = urlParts[urlParts.length - 2];
        return `SELECT ${distinctName} from ${tableName}`
    }


}
export let QueryGenerator = new QueryGeneratorClass();
