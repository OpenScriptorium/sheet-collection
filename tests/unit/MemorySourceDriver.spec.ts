import { describe, expect, it } from "vitest";
import { createMemoryDatabase } from "../helpers/createMemoryDatabase";

describe('MemorySourceDriver', () => {
    it('should persist sheets', () => {

        const db =
            createMemoryDatabase();

        const sheet =
            db.getOrCreateSheet('users');

        sheet.appendRow([
            '1',
            'Eduardo'
        ]);

        const loaded =
            db.getSheet('users');

        expect(
            loaded.getValues()
        ).toEqual([
            [
                '1',
                'Eduardo'
            ]
        ]);

    });
});