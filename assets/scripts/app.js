$(document).ready(function(){
  
    var programID;
    var i;
    var j = 0;
 
    var html= '<div class="card">';
    html += '<div class="card-title cardTitle">';
    html += '<button class="pencilButton"><img src="./assets/pencil_icons.png"/></button></div>';
    html += '<div class="card-body cardLabel"><p>Sales by month</p>';
    html += '<img class="graphImg" src="./assets/graph.png"/>';
    html += '<div class="row" id="totalRow">';
    html += '<div class="col-sm-4 totalLabel">Total Monthly<br/><span class="sales">Sales</span></div>';
    html += '<div class="col-sm-4 cardLabel monthSales">Current<br/></div>';
    html += '<div class="col-sm-4 cardLabel oneYear">1- Year<br/><img class="sparkline" src="./assets/spark_line.png"/></div>';
    html += '</div>';
    html += '<div class="row moreTable collapse" id="collapseTable">';
    html += '<div class="totalLabel tableDiv"><table>';
    html += '<th><tr><td class="priceName">Price Name</td>';
    html += '<td class="current">Current</td></tr></th></table></div>';
    html += '<div class="cardLabel oneYear oneYearHeader">1- Year<br/><img class="linesImg" src="./assets/spark_lines.png"/></div>';
    html += '</div>';
    html += '<div class="row moreInfo">';
    html += '<button class="cardLabel moreInfoTag collapsed" data-toggle="collapse" href="#collapseTable">';
    html += '<span class="if-not-collapsed">less</span>';
    html += '<span class="if-collapsed">more</span></button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    $.ajax({  
        type:'GET',
        url: 'https://api.myjson.com/bins/5bdb3', 
        dataType: 'json',
        success: function (data) {   
             for(i=0;i<data.length;i++){
                 if(i<3){
                    $('#statCards').append(html);
                    $(".cardTitle:eq("+i+")").prepend(data[i].Name);
                    totalMonthlySales = "<span class='emphasis'>" + currencyFormat(data[i].TotalMonthlySales)+ "</span>";
                    $(".monthSales:eq("+i+")").append(totalMonthlySales);

                    var programID = data[i].ProgramID;
                    getPricing(programID, i);
                 } else {
                    tableHTML = '<tr><td>'+ data[i].Name + '<br/><span class="small light">more</span></td>'
                    +'<td>'+ currencyFormatDec(data[i].TotalMonthlySales)+'</td>' 
                    +'<td>'+data[i].MonthlyAttendance+'</td></tr>';
                    $('#programList').append(tableHTML);
                 }
             }            
        }
    });

    function getPricing(programID, card){
        var program = programID;
        $.ajax({
            type:'GET',
            url:'https://api.myjson.com/bins/47axv',
            dataType: 'json',
            success: function (res){
                $.each(res,function(index,value) {
                    if(value.ProgramID == program){
                    var row = '<tr><td class="emphasis limited">' + value.Name + '</td>'
                        + '<td> ' + currencyFormat(value.Sales)+ '</td></tr>';
                        $(".tableDiv:eq("+card+")").append(row);
                    }
                });
            }
        })
    } 

    function currencyFormat(num) {
        return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    function currencyFormatDec(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
});
