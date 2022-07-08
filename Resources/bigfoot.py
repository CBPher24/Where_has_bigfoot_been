def update():
    import pandas as pd
    bf_df=pd.read_csv("../Data/Bigfoot_Locations.csv")
    state_names=pd.unique(bf_df['STATE_NAME'])
    bf_df = bf_df[bf_df.STATE_NAME != ' ']
    return bf_df