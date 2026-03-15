PYTHON ?= python

simulate:
	$(PYTHON) src/simulation/generate_data.py

features:
	$(PYTHON) src/features/build_features.py

train:
	$(PYTHON) src/models/train_baseline.py

test:
	$(PYTHON) -m pytest -q
