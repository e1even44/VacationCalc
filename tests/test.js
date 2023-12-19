QUnit.module('Weekend', function () {
    QUnit.test('is day weekend', function (assert) {
        get365days(2024);
        isWeekend();
        assert.true(daysOfYear[61].isWeekend, "The day of index 61 is a weekend.");
        assert.false(daysOfYear[134].isWeekend, "The day of year index 134 is not a weekend.");
        assert.true(daysOfYear[194].isWeekend, "The day of year index 194 is a weekend.");
        assert.false(daysOfYear[14].isWeekend, "The day of year index 14 is not a weekend.");
        assert.true(daysOfYear[222].isWeekend, "The day of year index 222 is a weekend.");
    });
})

QUnit.module('NationalHoliday', function () {
    QUnit.test('is day national holiday', async function (assert) {
        get365days(2024);
        await isNationalHoliday();
        assert.true(daysOfYear[0].isNationalHoliday, "January 1st is national holiday.");
        assert.true(daysOfYear[91].isNationalHoliday, "April 1st is national holiday.");
        assert.false(daysOfYear[156].isNationalHoliday, "Day of year index 156 is not national holiday.");
        assert.false(daysOfYear[187].isNationalHoliday, "Day of year index 187 is not national holiday.");
    })
});

QUnit.module('GapDay', function () {
    QUnit.test('is day a gap day', async function (assert) {
        get365days(2024);
        isWeekend();
        await isNationalHoliday();
        isGapDay();
        assert.true(daysOfYear[130].isGapDay, "May 10th is a gap day.");
        assert.true(daysOfYear[151].isGapDay, "May 31st is a gap day.");
        assert.false(daysOfYear[234].isGapDay, "August 22nd is not a gap day.");
        assert.true(daysOfYear[228].isGapDay, "August 16th is a gap day.");
    })
});