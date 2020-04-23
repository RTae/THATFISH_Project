from oauth2client.service_account import ServiceAccountCredentials
import gspread

# for read-only access, use this line
scope = ['https://www.googleapis.com/auth/spreadsheets.readonly']
url = 'https://docs.google.com/spreadsheets/d/1hKTglIdxfLcJmhakaXkxVGuZbGzsIIuYiDg9khjhnmo/edit#gid=874079255'

credentialGoogles = ServiceAccountCredentials.from_json_keyfile_name('./src/assert/GoogleKey.json', scope)
gc = gspread.authorize(credentialGoogles)

class googleSheet():
    def readData(self,data):
        gc.login()
        sheet = gc.open_by_url(url)
        worksheet = sheet.worksheet(data['name']).get_all_values()
        data = {data['name']:worksheet}
        return data