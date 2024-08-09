export function convertUrlToSql(url) {
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

