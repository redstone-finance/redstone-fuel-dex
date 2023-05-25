
DATA_NAME=fuel
IS_LOCAL=1

DEX_CONTRACT_ID=0x6d98583228051ce2a14968daad63b7bf22f3edb0af02e75b68da017d037b1412
TOKEN_CONTRACT_ID=0x6cb020a8d81d9394b9b3c70e0994b33835d43dd8069b0e427be574a2ee3c3437

ifeq ($(IS_LOCAL), 0)
#	SIGNING_KEY= # forc-wallet account 0
	NODE_URL=beta-3.fuel.network/graphql 
	GAS_PRICE=1
else
#	SIGNING_KEY=--unsigned
	NODE_URL=127.0.0.1:4000
	GAS_PRICE=0
endif

INITIALIZER=contract_initializer
TOKEN=token
DEX=dex

build: format
	cd $(TOKEN) && forc build
	cd $(DEX) && forc build

format:
	cd $(INITIALIZER) && forc-fmt
	cd $(TOKEN) && forc-fmt
	cd $(DEX) && forc-fmt

# make SIGNING_KEY=5b4 token
token: format
	cd $(TOKEN) && forc deploy \
	--node-url $(NODE_URL) \
	--gas-price $(GAS_PRICE) $(SIGNING_KEY)

# make SIGNING_KEY=5b4 token
dex: format
	cd $(DEX) && forc deploy \
	--node-url $(NODE_URL) \
	--gas-price $(GAS_PRICE) $(SIGNING_KEY)


init: format
	cd $(INITIALIZER) && forc run -r \
	--data 0x0$(IS_LOCAL) \
	--node-url $(NODE_URL) \
	--contract $(DEX_CONTRACT_ID) \
	--contract $(TOKEN_CONTRACT_ID) \
	--gas-limit 100000000 \
	--gas-price $(GAS_PRICE) $(SIGNING_KEY)
