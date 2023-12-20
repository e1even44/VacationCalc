QUnit.module('Weekend', function () {
    QUnit.test('is day weekend', function (assert) {
        getYear(2024);
        isWeekend();
        assert.true(fullyear[61].isWeekend, "March 2nd is a weekend.");
        assert.true(fullyear[194].isWeekend, "July 13rd is a weekend.");
        assert.true(fullyear[222].isWeekend, "August 10th is a weekend.");

        assert.false(fullyear[134].isWeekend, "May 14th is not a weekend.");
        assert.false(fullyear[14].isWeekend, "January 15th is not a weekend.");
    });
})

QUnit.module('NationalHoliday', function () {
    QUnit.test('is day national holiday', async function (assert) {
        getYear(2024);
        await isNationalHoliday();
        assert.true(fullyear[0].isNationalHoliday, "January 1st is a national holiday.");
        assert.true(fullyear[91].isNationalHoliday, "April 1st is a national holiday.");

        assert.false(fullyear[156].isNationalHoliday, "June 5th is not a national holiday.");
        assert.false(fullyear[187].isNationalHoliday, "July 6th is not a national holiday.");
    })
});

QUnit.module('GapDay', function () {
    QUnit.test('is day a gap day', async function (assert) {
        getYear(2024);
        isWeekend();
        await isNationalHoliday();
        isGapDay();
        assert.true(fullyear[130].isGapDay, "May 10th is a gap day.");
        assert.true(fullyear[151].isGapDay, "May 31st is a gap day.");
        assert.true(fullyear[228].isGapDay, "August 16th is a gap day.");

        assert.false(fullyear[234].isGapDay, "August 22nd is not a gap day.");
    })
});

QUnit.module('CompanyHoliday', function () {
    QUnit.test('is day company holiday', async function (assert) {
        getYear(2024);
        await isCompanyHoliday();
        assert.true(fullyear[1].isCompanyHoliday, "January 2nd is a company holiday.");
        assert.true(fullyear[4].isCompanyHoliday, "January 5th is a company holiday.");
        assert.true(fullyear[219].isCompanyHoliday, "August 7th is a company holiday.");
        assert.true(fullyear[226].isCompanyHoliday, "August 14th is a company holiday.");
        assert.true(fullyear[228].isCompanyHoliday, "August 16th is a company holiday.");

        assert.false(fullyear[326].isCompanyHoliday, "November 22nd is not acompany holiday.");
        assert.false(fullyear[298].isCompanyHoliday, "October 25th is not a company holiday.");
        assert.false(fullyear[51].isCompanyHoliday, "February 21st is not a company holiday.");
    })
});

QUnit.module('FullYearInformation', function () {
    QUnit.test('is table of full year data correct', async function (assert) {
        await getFullInfoYear(2024);
        assert.true(fullyear[12].isWeekend, "January 13th is a weekend.");
        assert.true(fullyear[230].isWeekend, "August 18th is a weekend.");   
        assert.false(fullyear[144].isWeekend, "May 24th is not a weekend.");   
        assert.false(fullyear[303].isWeekend, "October 10th is not a weekend.");         

        assert.true(fullyear[5].isNationalHoliday, "January 5th is a national holiday.");
        assert.true(fullyear[91].isNationalHoliday, "April 1st is a national holiday.");
        assert.false(fullyear[224].isNationalHoliday, "August 12th is not a national holiday.");
        assert.false(fullyear[356].isNationalHoliday, "December 22th is not a national holiday.");

        assert.true(fullyear[130].isGapDay, "May 10th is a gap day.");
        assert.true(fullyear[151].isGapDay, "May 31st is a gap day.");
        assert.false(fullyear[197].isGapDay, "July 16th is not a gap day.");
        assert.false(fullyear[350].isGapDay, "December 16th is not a gap day.");

        assert.true(fullyear[358].isCompanyHoliday, "December 24th is a company holiday.");
        assert.false(fullyear[359].isCompanyHoliday, "December 25th is a company holiday.");
        assert.false(fullyear[263].isCompanyHoliday, "September 20th is not a company holiday.");
        assert.false(fullyear[170].isCompanyHoliday, "June 19th is not a company holiday.");
    })
});