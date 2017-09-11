function tally_expenses(ele) {

    // error check; format field
    errorCheckField(ele);
    
    //
    // Tally
    //
    
    var form  = document.expenseForm;
    var total = 0;
    
    // go thru all one-time expense fields
    var one_time_field_names = ["fee", "us_domestic_transportation", "housing", "housing_deposit", "AMS_payment", "tuition_differential", 
    "overload_fee", "meal_plan", "insurance", "passport", "textbooks", "class_supplies", 
    "class_copppies", "class_transportation", "clothes", "personal_care", 
    "medication", "household_items", "emergency_reserve", "phone", "reentry", "souvenirs", "personal_misc"];
    
    for (var i =0; i < one_time_field_names.length; i++) {
        var field_name = one_time_field_names[i];
        total += fieldValueAsNum(form[field_name]);
    }
    
    // per week expenses
    var per_week_field_name_prefixes = [ "meals", "snacks", "entertainment_transportation", "entertainment_dining",
    "entertainment_activities", "entertainment_other" ];
    
    var weeks = fieldValueAsNum(form.number_of_weeks);
    
    for (var i =0; i < per_week_field_name_prefixes.length; i++) {
        var per_week_field_name = per_week_field_name_prefixes[i] + '_per_week';
        var total_field_name = per_week_field_name_prefixes[i] + '_total';
        
        var sub_total = fieldValueAsNum(form[per_week_field_name]) * weeks;
        form[total_field_name].value = to_money(sub_total);
        total += sub_total;
    }
    
    // per trip expenses
    var number_of_trips = fieldValueAsNum(form.number_of_trips);
    
    var per_trip_field_name_prefixes = [ "travel_transportation", "travel_accommodations", "travel_meals", "travel_snacks", "travel_entertainment" ];
    
    for (var i =0; i < per_trip_field_name_prefixes.length; i++) {
        var per_week_field_name = per_trip_field_name_prefixes[i] + '_per_trip';
        var total_field_name = per_trip_field_name_prefixes[i] + '_total';
        
        var sub_total = fieldValueAsNum(form[per_week_field_name]) * number_of_trips;
        form[total_field_name].value = to_money(sub_total);
        total += sub_total;
    }
    
    form.total.value = to_money(total);
}

function errorCheckField(ele) {
    //
    // Format given field value. mark error if necessary.
    //
    
    var no_error_check_fields = ["meals_total", "snacks_total", "entertainment_transportation_total", "entertainment_dining_total",
    "entertainment_activities_total", "entertainment_other_total",
    "travel_transportation_total", "travel_accommodations_total", "travel_meals_total", "travel_snacks_total", "travel_entertainment_total" ];
    
    // skip if not a field that needs to be error checked
    for (var i = 0; i < no_error_check_fields.length; i++) {
        if (no_error_check_fields[i] == ele.name) {
            ele.value = '';
            return true;
        }
    }
    
    // only do stuff to the field if any value given
    if (ele.value.length) {
        var expense = parseFloat(ele.value);
        
        if (isNaN(expense))
            return errorField(ele);
        else if (
            (ele.name != 'number_of_weeks') &&
            (ele.name != 'number_of_trips')
        ) {
            // don't do for number of weeks of program or number_of_trips
            ele.value = to_money(expense);
        }
    }
    
    // reset just in case
    unErrorField(ele);
    
    return true;
}

function fieldValueAsNum(field) {
    var value = parseFloat(field.value);
    
    if (isNaN(value))
        value = 0;
    
    return value;
}

function errorField(field) {
    field.style.backgroundColor = '#faa';
    return false;
}

function unErrorField(field) {
    field.style.backgroundColor = '#fff';
}

function to_money(number) {
    number_str = String(number);
    
    if (number_str.indexOf('.') > -1) {
        if (!number_str.match(/\.\d\d$/)) {
            if (!number_str.match(/\.\d$/)) {
                
                var parts = number_str.split('.');
                var dollars = parts[0];
                
                var m = number_str.match(/\.(\d\d\d)/);
                var cents = m[1];
                cents = Math.round(cents/10);
                
                number_str = dollars + '.' + cents;
            }
            
            if (number_str.match(/\.\d$/))
                number_str += '0';
        }
    }
    else
        number_str += '.00';
    
    return number_str;
}
