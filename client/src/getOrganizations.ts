/**
 * Created by Vlad on 4/23/2017.
 */
export function getOrganizations($view:JQuery){

 return $.get('/api/getOrganizationList').then(function (res) {
    console.log('getOrganizationList', res);

    res.forEach(function (item, i, arr) {
      $view.append(
        $('<a>').addClass('dropdown-item').attr('href', item.group_id[0]).text(item.group_name[0] + ' (id=' + item.group_id[0] + ')')
      );
    });
  }).fail(function (error) {
    console.error('error', error);
  });
}