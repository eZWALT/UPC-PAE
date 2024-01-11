# UPC-PAE

![Link Broken](https://media.discordapp.net/attachments/964517229150498846/1164543004028190770/real-removebg-preview.png)

## The Challenge

In this subject, we formed teams of 4 and were asked to choose a challenge from one of the five companies involved. Estrella Damm at the moment has a lot of data of their huge barrels given to the most exclusive clients called BeerDrives. This excel data remains yet unused by the company and wants some fresh ideas on how using this data could improve Damms headquarters so loss of beer and logistic hell is avoided altogether thanks to a improved monitorization or any idea that could improve that.

## Our solution: BeerLogic

This is our solution to the DAMM challenge. BeerLogic is a web application that uses all the data given by damm to show predictions of dates for the next refills of Beerdrives and possible route scheduling that could be done. Also includes tools of data visualization, that consist of relevant graphics and statistics for the company to improve their logistics.

## Meet the team

- `Alex Herrero`
- `Pol Forner`
- `Lluc Clavera`
- `Walter Troiani`

## Usage

In order to execute this project that consists in 2 well-differentiated parts: The data pipeline (Including all the data transformations and the predictions made by the beerlogic machine learning model) and the front-end website. To run the data pipeline, which may take several minutes just run the jupyter notebook:

```console
    pip install -r data_pipeline/requirements.txt
    jupyter notebook
    enter data_pipeline/ETL_run_pipeline.ipynb
    run all
```

To run the frontend website just open the ```web_prototype/index.html``` file and enjoy!

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for more details.
