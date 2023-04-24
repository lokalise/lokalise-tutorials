package com.example.lokalisei18n

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.widget.TextView
import androidx.appcompat.app.ActionBar

import java.util.Locale
import android.content.Context
import com.example.lokalisei18n.utils.ContextUtils
import java.text.DateFormat
import java.util.Date
import com.lokalise.sdk.LokaliseContextWrapper

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val actionBar: ActionBar? = supportActionBar
        actionBar?.setTitle(R.string.app_name)
        val textView = findViewById<TextView>(R.id.test_text_view)
        textView.setText(R.string.hello_world)

        with (resources) {
            val pluralViewOne = findViewById<TextView>(R.id.plural_view_one)
            val quantityStringFor1 = getQuantityString(R.plurals.my_cats, 0, 0)
            pluralViewOne.text = quantityStringFor1

            val pluralViewFew = findViewById<TextView>(R.id.plural_view_few)
            val quantityStringFor2 = getQuantityString(R.plurals.my_cats, 1, 1)
            pluralViewFew.text = quantityStringFor2

            val pluralViewMany = findViewById<TextView>(R.id.plural_view_many)
            val quantityStringFor5 = getQuantityString(R.plurals.my_cats, 3, 3)
            pluralViewMany.text = quantityStringFor5

            val currentDateTime = Date()
            val localizedDateTimeView = findViewById<TextView>(R.id.localized_date_time_view)
            localizedDateTimeView.text = DateFormat.getDateTimeInstance().format(currentDateTime)
        }
    }

    override fun attachBaseContext(newBase: Context) {
        super.attachBaseContext(LokaliseContextWrapper.wrap(newBase))

//        val localeToSwitch = Locale("lv")
//        val localeUpdatedContext = ContextUtils.updateLocale(newBase, localeToSwitch)
//        super.attachBaseContext(localeUpdatedContext)
    }
}