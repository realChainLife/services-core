adminApp.AdminContributions.VM = (function(){
  var contributions = m.prop({}),
      filters = m.prop({}),
      isLoading = m.prop(false),
      page = m.prop(1);

  var fetch = function(){
    var d = m.deferred();
    m.startComputation();
    adminApp.models.ContributionDetail.get(filters(), page()).then(function(data){
      contributions(_.union(contributions(), data));
      isLoading(false);
      d.resolve(contributions());
      m.endComputation();
    });
    return d.promise;
  };

  var filter = function(input){
    filters(input);
    page(1);
    return fetch();
  };

  var nextPage = function(){
    page(page()+1);
    isLoading(true);
    m.redraw();
    return fetch();
  };

  return {
    contributions: contributions,
    fetch: fetch,
    filter: filter,
    isLoading: isLoading,
    nextPage: nextPage
  };
})();