export const layoutServerTemplate = `
import { redirect } from '@sveltejs/kit';
import type { LayoutServerData } from './$types';
import { db } from "$lib/database/db";
import { {MODEL_NAME} } from $lib/database/schema/{MODEL_NAME};


export const load: LayoutServerData = async (event) => {
	if (!event.locals.user) {
		redirect(302, '/');
	}

    return {
        {MODEL_NAME}List: await db.select().from({MODEL_NAME});
    }
};

`

