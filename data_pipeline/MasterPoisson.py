import pandas as pd
import numpy as np
from matplotlib import pyplot as plt
from tabulate import tabulate
from patsy import dmatrices
import statsmodels.api as sm
from datetime import timedelta

#ID de bar a predecir
ID = 111401
#dias extra de predicción
dias = 200

def PredictionDays(ID_bar, n_dias, dataset, predictionVars):

    data = dataset[['fecha_pedido','litros_pedidos_cliente', 'id_cliente']]


    data = data.rename(columns={'fecha_pedido':'ds'})
    data = data.rename(columns={'litros_pedidos_cliente':'y'})
    data = data.rename(columns={'id_cliente':'unique_id'})
    data['ds'] = pd.to_datetime(data['ds'])
    data['y'] = 1

    start_date = data.ds.min()
    day_limit = data.ds.max()
    end_date = data.ds.max() + timedelta(days=dias)

    # Create a MultiIndex with all combinations of product and date
    product_range = pd.MultiIndex.from_product([data['unique_id'].unique(), pd.date_range(start=start_date, end=end_date, freq='D')], names=['unique_id', 'ds'])


    # Merge with the original DataFrame to fill in missing values
    data = pd.merge(data, pd.DataFrame(index=product_range).reset_index(), on=['unique_id', 'ds'], how='right').fillna(0)

    #data=data.set_index('ds').reindex(pd.date_range(start=data.ds.min(), end=data.ds.max(),freq='D'),fill_value=0)
    #data = data.reset_index()
    #data = data.rename(columns={'index':'ds'})
    #data

    data = data[data['unique_id'] == ID]
    data = data.reset_index()
    last_day = data[data['ds'] == day_limit]
    last_day = last_day.index[0]


    ds = data.ds
    data['MONTH'] = ds.dt.month
    data['DAY_OF_WEEK'] = ds.dt.dayofweek
    data['DAY'] = ds.dt.day

    mask = np.random.rand(len(data)) < 0.8
    df_train = data[mask]
    df_test = data[~mask]
    print('Training data set length='+str(len(df_train)))
    print('Testing data set length='+str(len(df_test)))

    expr = predictionVars
    y_train, X_train = dmatrices(expr, df_train, return_type='dataframe')
    y_test, X_test = dmatrices(expr, df_test, return_type='dataframe')
    poisson_training_results = sm.GLM(y_train, X_train, family=sm.families.Poisson()).fit()

    poisson_predictions = poisson_training_results.get_prediction(X_test)
    #summary_frame() returns a pandas DataFrame
    predictions_summary_frame = poisson_predictions.summary_frame()

    predicted_counts=predictions_summary_frame['mean']
    future = predicted_counts[predicted_counts.index > last_day]
    mean = future.sum()/len(future)
    future = future[future.values >= mean]
    
    return pd.DataFrame({"fecha_prediccion_discreta": future.index, "probabilidad": future.values, "fecha_prediccion": pd.to_datetime(start_date) + pd.to_timedelta(future.index, unit="D")})    
    
