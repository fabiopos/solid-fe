import { makeConfig } from "./config.infra";

describe("Config tests", () => {
  it("AUTH config returns properly", () => {
    const { auth: config } = makeConfig();

    const login = config.getLoginEndpoint();
    const twoFactorDeps = config.get2FADepsEndpoint();
    const twoFactorCreate = config.get2FAEndpoint();
    const twoFactorVerify = config.get2FAVerifyEndpoint();

    expect(login.endpoint).toEqual("/auth/login");
    expect(twoFactorCreate.endpoint).toEqual("/auth/2fa");
    expect(twoFactorDeps.endpoint).toEqual("/auth/invite");
    expect(twoFactorVerify.endpoint).toEqual("/auth/2fa/verify");
    //expect(login.endpoint).toEqual("/auth/login");
  });

  it("PLAYER config returns properly", () => {
    const { player: config } = makeConfig();
    const pid = "123";
    const tid = "345";

    const playerGet = config.getPlayerGetEndpoint(tid);
    const playerAdd = config.getPlayerAddEndpoint();
    const playerUpdate = config.getPlayerUpdateEndpoint(pid);
    const playerDelete = config.getPlayerDeleteEndpoint(pid);
    const playerFind = config.getPlayerFindEndpoint(pid);

    expect(playerGet.endpoint).toEqual(`/player/${tid}/with-stats`);
    expect(playerAdd).toEqual({ endpoint: "/player", method: "POST" });
    expect(playerUpdate).toEqual({
      endpoint: `/player/${pid}`,
      method: "PATCH",
    });
    expect(playerDelete).toEqual({
      endpoint: `/player/${pid}`,
      method: "DELETE",
    });
    expect(playerFind).toEqual({
      endpoint: `/player/${pid}/details`,
      method: "GET",
    });
    //expect(login.endpoint).toEqual("/auth/login");
  });

  it("USER config returns properly", () => {
    const { user: config } = makeConfig();
    const uid = "123";

    const userAdd = config.getUserAddEndpoint();
    const userUpdate = config.getUserUpdateEndpoint(uid);
    const userDelete = config.getUserDeleteEndpoint(uid);
    const userGetAll = config.getUserGetAllEndpoint();
    const userValidate = config.getUserValidateEndpoint();

    expect(userAdd).toEqual({ endpoint: "/user", method: "POST" });
    expect(userUpdate).toEqual({ endpoint: `/user/${uid}`, method: "PATCH" });
    expect(userDelete).toEqual({ endpoint: `/user/${uid}`, method: "DELETE" });
    expect(userGetAll).toEqual({ endpoint: "/user", method: "GET" });
    expect(userValidate).toEqual({
      endpoint: "/user/validate",
      method: "POST",
    });
    //expect(login.endpoint).toEqual("/auth/login");
  });

  it("TEAM config returns properly", () => {
    const { team: config } = makeConfig();
    const tid = "123";
    const name = "search-name-value";

    const teamGetAll = config.getTeamGetAllEndpoint();
    const teamAdd = config.getTeamAddEndpoint();
    const teamGetById = config.getTeamGetByIdEndpoint(tid);
    const teamDelete = config.getTeamDeleteEndpoint(tid);
    const teamUpdate = config.getTeamUpdateEndpoint(tid);
    const teamValidate = config.getTeamValidateEndpoint();
    const teamSearchByName = config.getTeamSearchByNameEndpoint(name);
    const teamInviteValidate = config.getTeamInviteValidateEndpoint();

    expect(teamGetAll).toEqual({ endpoint: "/team", method: "GET" });
    expect(teamAdd).toEqual({ endpoint: "/team", method: "POST" });
    expect(teamGetById).toEqual({ endpoint: `/team/${tid}`, method: "GET" });
    expect(teamDelete).toEqual({ endpoint: `/team/${tid}`, method: "DELETE" });
    expect(teamUpdate).toEqual({ endpoint: `/team/${tid}`, method: "PATCH" });
    expect(teamValidate).toEqual({
      endpoint: "/team/validate",
      method: "POST",
    });
    expect(teamSearchByName).toEqual({
      endpoint: `/team/search?name=${name}`,
      method: "GET",
    });
    expect(teamInviteValidate).toEqual({
      endpoint: "/team/invite-validate",
      method: "POST",
    });
  });

  it("SUBSCRIPTION config returns properly", () => {
    const { subscription: config } = makeConfig();
    const sid = "123";

    const subsGetAll = config.getSubsGetAllEndpoint();
    const subsAdd = config.getSubsAddEndpoint();
    const subsGetById = config.getTeamFindByIdEndpoint(sid);

    expect(subsGetAll).toEqual({ endpoint: "/subscription", method: "GET" });
    expect(subsAdd).toEqual({ endpoint: "/subscription", method: "POST" });
    expect(subsGetById).toEqual({
      endpoint: `/subscription/${sid}`,
      method: "GET",
    });
  });

  it("SEASON config returns properly", () => {
    const { season: config } = makeConfig();
    const ssid = "123";
    const tid = "456";
    const sid = "789";

    const seasonGetAll = config.getAll();
    const seasonFindById = config.find(ssid);
    const seasonGetTree = config.getSeasonTree(ssid);
    const seasonGetBySub = config.getAllSeasonBySubscription(sid);
    const seasonCreate = config.create(tid);
    const seasonUpdate = config.update(ssid);
    const seasonDelete = config.delete(ssid);

    expect(seasonGetAll).toEqual({ endpoint: "/season", method: "GET" });
    expect(seasonFindById).toEqual({
      endpoint: `/season/${ssid}/details`,
      method: "GET",
    });
    expect(seasonGetTree).toEqual({
      endpoint: `/season/${ssid}/tree`,
      method: "GET",
    });
    expect(seasonGetBySub).toEqual({
      endpoint: `/season/${sid}/subscription`,
      method: "GET",
    });
    expect(seasonCreate).toEqual({
      endpoint: `/season/${tid}`,
      method: "POST",
    });
    expect(seasonUpdate).toEqual({
      endpoint: `/season/${ssid}`,
      method: "PATCH",
    });
    expect(seasonDelete).toEqual({
      endpoint: `/season/${ssid}`,
      method: "DELETE",
    });
  });

  it("FIELD-POSITION config returns properly", () => {
    const { fieldPosition: config } = makeConfig();

    const fieldPositionGetAll = config.getAll();

    expect(fieldPositionGetAll).toEqual({
      endpoint: "/field-position",
      method: "GET",
    });
  });

  it("DASHBOARD config returns properly", () => {
    const { dashboard: config } = makeConfig();

    const tid = "123";

    const getTeamStats = config.getTeamStats(tid);
    const getAsists = config.getAsists(tid);
    const getCalendar = config.getCalendar(tid);
    const getLastMatches = config.getLastMatches(tid);
    const getLastPlayersAdded = config.getLastPlayersAdded(tid);
    const getNextMatches = config.getNextMatches(tid);
    const getTopScorers = config.getTopScorers(tid);

    expect(getTeamStats).toEqual({
      endpoint: `/dashboard/team-stats/${tid}`,
      method: "GET",
    });

    expect(getAsists).toEqual({
      endpoint: `/dashboard/top-asists/${tid}`,
      method: "GET",
    });

    expect(getCalendar).toEqual({
      endpoint: `/dashboard/calendar/${tid}`,
      method: "GET",
    });

    expect(getLastMatches).toEqual({
      endpoint: `/dashboard/last-matches/${tid}`,
      method: "GET",
    });

    expect(getLastPlayersAdded).toEqual({
      endpoint: `/dashboard/last-players-added/${tid}`,
      method: "GET",
    });

    expect(getNextMatches).toEqual({
      endpoint: `/dashboard/next-matches/${tid}`,
      method: "GET",
    });

    expect(getTopScorers).toEqual({
      endpoint: `/dashboard/top-scorers/${tid}`,
      method: "GET",
    });
  });
});
