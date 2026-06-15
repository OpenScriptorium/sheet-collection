import { describe, expect, it } from "vitest";
import { RowMapper } from "../../src/mappers/RowMapper";

describe('RowMapper', () => {

  it('should map row to document', () => {

    const result =
      RowMapper.toDocument(
        ['id', 'name'],
        ['1', 'Eduardo']
      );

    expect(result).toEqual({
      id: '1',
      name: 'Eduardo'
    });

  });

});