import BB from 'backbone';
import SM from 'backbone.supermodel';

let User = SM.Model.extend();
let AccountGroup = SM.Model.extend();
let Account = SM.Model.extend();

let Users = BB.Collection.extend({
  model: (attrs, options) => User.create(attrs, options)
});
let AccountGroups = BB.Collection.extend({
  model: (attrs, options) => AccountGroup.create(attrs, options)
});
let Accounts = BB.Collection.extend({
  model: (attrs, options) => Account.create(attrs, options)
});

User.has()
  .many('accountGroups', {
    collection: AccountGroups,
    inverse: 'user'
  })
  .many('accounts', {
    inverse: 'user',
    source: 'accounts',
    collection: Accounts
  });

AccountGroup.has()
  .one('user', {
    model: User,
    inverse: 'accountGroups'
  });

AccountGroup.has()
  .many('accounts', {
    collection: Accounts,
    inverse: 'accountGroup'
  });

Account.has()
  .one('accountGroup', {
    id: 'account_group_id',
    model: AccountGroup,
    inverse: 'accounts'
  });

Account.has()
  .one('user', {
    model: User,
    inverse: 'accounts'
  });

let user = User.create({id: 1});
let accountGroup = AccountGroup.create({id: 2, user_id: 1, accounts: [ {id:3} ]});
let account = Account.create({id: 3, account_group_id: 2, user_id: 1});

console.log(user.accounts().contains(account));

account.set(account.parse({ user: { id: 1, name: "joe", accountGroups: [ { id: 2, name: "group" } ] }, name: "money" }));

console.log(user.get('name') === "joe");
console.log(accountGroup.get('name') === "group");
console.log(account.get('name') === "money");

export default {};
