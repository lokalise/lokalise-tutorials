package com.example.lokalisei18n
import android.app.Application
import com.lokalise.sdk.Lokalise

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Lokalise.init(this, "f0deb3bde4467d8b35a2b589034d81f698c3", "44749534644685cf3410d0.03071739")
        Lokalise.updateTranslations()
    }
}