QUnit.module('Weekend', function () {
    QUnit.test('is day weekend', async function (assert) {
        await getFullInfoYear(2024);
        assert.true(fullYear[61].isWeekend, "March 2nd is a weekend.");
        assert.true(fullYear[194].isWeekend, "July 13rd is a weekend.");
        assert.true(fullYear[222].isWeekend, "August 10th is a weekend.");

        assert.false(fullYear[134].isWeekend, "May 14th is not a weekend.");
        assert.false(fullYear[14].isWeekend, "January 15th is not a weekend.");
    });
})

QUnit.module('NationalHoliday', function () {
    QUnit.test('is day national holiday', async function (assert) {
        await getFullInfoYear(2024);
        assert.true(fullYear[0].isNationalHoliday, "January 1st is a national holiday.");
        assert.true(fullYear[91].isNationalHoliday, "April 1st is a national holiday.");

        assert.false(fullYear[156].isNationalHoliday, "June 5th is not a national holiday.");
        assert.false(fullYear[187].isNationalHoliday, "July 6th is not a national holiday.");
    })
});

QUnit.module('GapDay', function () {
    QUnit.test('is day a gap day', async function (assert) {
        await getFullInfoYear(2024);
        assert.true(fullYear[130].isGapDay, "May 10th is a gap day.");
        assert.true(fullYear[151].isGapDay, "May 31st is a gap day.");

        assert.false(fullYear[228].isGapDay, "August 16th is not a gap day.");
        assert.false(fullYear[234].isGapDay, "August 22nd is not a gap day.");
    })
});

QUnit.module('CompanyHoliday', function () {
    QUnit.test('is day company holiday', async function (assert) {
        await getFullInfoYear(2024);
        assert.true(fullYear[1].isCompanyHoliday, "January 2nd is a company holiday.");
        assert.true(fullYear[4].isCompanyHoliday, "January 5th is a company holiday.");
        assert.true(fullYear[219].isCompanyHoliday, "August 7th is a company holiday.");
        assert.true(fullYear[226].isCompanyHoliday, "August 14th is a company holiday.");
        assert.true(fullYear[228].isCompanyHoliday, "August 16th is a company holiday.");

        assert.false(fullYear[326].isCompanyHoliday, "November 22nd is not acompany holiday.");
        assert.false(fullYear[298].isCompanyHoliday, "October 25th is not a company holiday.");
        assert.false(fullYear[51].isCompanyHoliday, "February 21st is not a company holiday.");
    })
});

QUnit.module('FullYearInformation', function () {
    QUnit.test('is table of full year data correct', async function (assert) {
        await getFullInfoYear(2024);
        assert.true(fullYear[12].isWeekend, "January 13th is a weekend.");
        assert.true(fullYear[230].isWeekend, "August 18th is a weekend.");
        assert.false(fullYear[144].isWeekend, "May 24th is not a weekend.");
        assert.false(fullYear[303].isWeekend, "October 10th is not a weekend.");

        assert.true(fullYear[5].isNationalHoliday, "January 5th is a national holiday.");
        assert.true(fullYear[91].isNationalHoliday, "April 1st is a national holiday.");
        assert.true(fullYear[227].isNationalHoliday, "August 15th is a national holiday.");
        assert.false(fullYear[224].isNationalHoliday, "August 12th is not a national holiday.");
        assert.false(fullYear[356].isNationalHoliday, "December 22th is not a national holiday.");

        assert.true(fullYear[130].isGapDay, "May 10th is a gap day.");
        assert.true(fullYear[357].isGapDay, "December 23rd is a gap day.");
        assert.true(fullYear[361].isGapDay, "December 27th is a gap day.");
        assert.true(fullYear[364].isGapDay, "December 30th is a gap day.");
        assert.true(fullYear[151].isGapDay, "May 31st is a gap day.");
        assert.false(fullYear[197].isGapDay, "July 16th is not a gap day.");
        assert.false(fullYear[350].isGapDay, "December 16th is not a gap day.");

        assert.true(fullYear[224].isCompanyHoliday, "August 12th is a company holiday.");
        assert.true(fullYear[225].isCompanyHoliday, "August 13th is a company holiday.");
        assert.true(fullYear[226].isCompanyHoliday, "August 14th is a company holiday.");
        assert.false(fullYear[359].isCompanyHoliday, "December 25th is a company holiday.");
        assert.false(fullYear[263].isCompanyHoliday, "September 20th is not a company holiday.");
        assert.false(fullYear[170].isCompanyHoliday, "June 19th is not a company holiday.");
    })
});

QUnit.module('ReturnsMinVacHours', function () {
    QUnit.test('does function return correct min-vacation-hours of given day', async function (assert) {
        
        assert.equal(await getMinHoursOfGivenDay(new Date(2024, 1-1, 8), 2024), 101.75, "Minimum vacation hours on January 8th are 101.75h.");
        assert.equal(await getMinHoursOfGivenDay(new Date(2024, 2-1, 14), 2024), 101.75, "Minimum vacation hours on February 14th are 101.75h.");
        assert.equal(await getMinHoursOfGivenDay(new Date(2024, 5-1, 15), 2024), 96.25, "Minimum vacation hours on May 15th are 96.25h.");
        assert.equal(await getMinHoursOfGivenDay(new Date(2024, 6-1, 3), 2024), 90.75, "Minimum vacation hours on June 3rd are 90.75h.");
        assert.equal(await getMinHoursOfGivenDay(new Date(2024, 8-1, 8), 2024), 66, "Minimum vacation hours on August 8th are 66h.");
        assert.equal(await getMinHoursOfGivenDay(new Date(2024, 8-1, 13), 2024), 44, "Minimum vacation hours on August 13th are 44h.");
        assert.equal(await getMinHoursOfGivenDay(new Date(2024, 12-1, 21), 2024), 22, "Minimum vacation hours on December 21st are 22h.");
        assert.equal(await getMinHoursOfGivenDay(new Date(2024, 12-1, 27), 2024), 13.75, "Minimum vacation hours on December 27th are 13.75h.");
        assert.equal(await getMinHoursOfGivenDay(new Date(2024, 12-1, 30), 2024), 8.25, "Minimum vacation hours on December 30th are 8.25h.");
    })
});