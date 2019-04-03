select * from trait INNER JOIN slimeTrait ON trait.id = slimeTrait."traitId";
select * from slime INNER JOIN dragonTrait ON slime.id = slimeTrait."slimeId";

gets all stuff from a slime:


